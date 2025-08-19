
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EncounterScreen from './components/EncounterScreen';
import { Player, GameEvent, GeminiEncounterResponse, EncounterChoice } from './types';
import { REALMS, SPIRITUAL_ROOTS } from './constants';
import { generateRandomEvent, generateEncounter } from './services/geminiService';

const App: React.FC = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [log, setLog] = useState<GameEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentEncounter, setCurrentEncounter] = useState<GeminiEncounterResponse | null>(null);

  const addLog = useCallback((message: string, type: GameEvent['type'] = 'system') => {
    const timestamp = new Date();
    const timeString = timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedMessage = `[${timeString}] ${message}`;
    setLog(prevLog => [{ message: formattedMessage, type, timestamp }, ...prevLog.slice(0, 99)]);
  }, []);

  const handleStartGame = (name: string) => {
    const randomRoot = SPIRITUAL_ROOTS[Math.floor(Math.random() * SPIRITUAL_ROOTS.length)];
    const initialPlayer: Player = {
      name: name,
      realm: REALMS[0],
      exp: 0,
      age: 16,
      hp: 15,
      maxHp: 20,
      mp: 0,
      maxMp: 0,
      attack: 2,
      defense: 1,
      luck: 4,
      sect: 'Tán Tu',
      spiritualRoot: randomRoot,
      weapon: 'Trống',
      armor: 'Trống',
    };
    setPlayer(initialPlayer);
    addLog(`Chào mừng ${name} đến với thế giới tu tiên! Hành trình của bạn bắt đầu từ ${initialPlayer.realm.name}.`, 'system');
    addLog(`Linh căn của bạn là: ${randomRoot.name}.`, 'system');
  };

  const handleCultivate = useCallback(async () => {
    if (!player) return;
    setIsLoading(true);

    const baseGain = 10;
    const expGained = Math.floor(baseGain * player.spiritualRoot.modifier * (player.realm.id + 1));
    const newExp = player.exp + expGained;

    addLog(`Bạn tĩnh tọa tu luyện, nhận được ${expGained} kinh nghiệm.`, 'cultivate');

    if (Math.random() < 0.15) {
      try {
        addLog('Dường như có điềm lạ...', 'event');
        const event = await generateRandomEvent(player.realm.name);
        if (event) {
          const { description, effect } = event;
          addLog(`[Cơ Duyên!] ${description}`, 'event');
          setPlayer(p => {
            if (!p) return null;
            return {
              ...p,
              exp: Math.max(0, p.exp + expGained + (effect.expGained || 0)),
              // Thọ nguyên is not a stat yet, this can be added later
            };
          });
          if(effect.expGained && effect.expGained > 0) addLog(`Kinh nghiệm tăng thêm ${effect.expGained}!`, 'event');
          if(effect.expGained && effect.expGained < 0) addLog(`Kinh nghiệm giảm đi ${Math.abs(effect.expGained)}!`, 'danger');
        }
      } catch (error) {
        console.error("Lỗi khi tạo sự kiện:", error);
        addLog("Thiên cơ hỗn loạn, không có gì xảy ra.", 'system');
        setPlayer(p => p ? { ...p, exp: newExp } : null);
      }
    } else {
      setPlayer(p => p ? { ...p, exp: newExp } : null);
    }

    setIsLoading(false);
  }, [player, addLog]);

  const handleBreakthrough = useCallback(() => {
    if (!player || player.exp < player.realm.required) return;
    setIsLoading(true);

    const nextRealmIndex = player.realm.id + 1;
    if (nextRealmIndex >= REALMS.length) {
      addLog("Đạo hữu đã đạt đến đỉnh cao, vô địch thiên hạ!", 'breakthrough');
      setIsLoading(false);
      return;
    }

    const nextRealm = REALMS[nextRealmIndex];
    const successChance = 0.8 / ((nextRealmIndex + 1) * 0.25);

    addLog(`Bắt đầu đột phá cảnh giới ${nextRealm.name}...`, 'breakthrough');

    setTimeout(() => {
      if (Math.random() < successChance) {
        setPlayer({
          ...player,
          realm: nextRealm,
          exp: 0,
        });
        addLog(`Đột phá thành công! Chúc mừng đạo hữu đã tiến vào cảnh giới ${nextRealm.name}.`, 'breakthrough');
      } else {
        const expLoss = Math.floor(player.exp * 0.3);
        setPlayer({
          ...player,
          exp: player.exp - expLoss,
        });
        addLog(`Đột phá thất bại! Cảnh giới bất ổn, kinh nghiệm tổn thất ${expLoss}.`, 'danger');
      }
      setIsLoading(false);
    }, 2000);
  }, [player, addLog]);

  const handleStartEncounter = useCallback(async () => {
    if (!player) return;
    setIsLoading(true);
    addLog('Bạn quyết định ra ngoài rèn luyện, tìm kiếm cơ duyên...', 'encounter');
    try {
      const encounter = await generateEncounter(player.realm.name);
      if (encounter) {
        setCurrentEncounter(encounter);
      } else {
        addLog('Thiên cơ bất định, chuyến đi này không có gì đặc biệt xảy ra.', 'system');
      }
    } catch (error) {
      console.error("Lỗi khi tạo kỳ ngộ:", error);
      addLog('Một cơn gió lạ thổi qua, bạn cảm thấy nên quay về động phủ.', 'system');
    } finally {
      setIsLoading(false);
    }
  }, [player, addLog]);

  const handleResolveEncounter = useCallback((choice: EncounterChoice) => {
    if (!player) return;
    
    addLog(`Bạn chọn: "${choice.text}"`, 'encounter');
    addLog(choice.outcome, 'encounter');

    setPlayer(p => {
      if (!p) return null;
      return {
        ...p,
        exp: Math.max(0, p.exp + (choice.effect.expGained || 0)),
      };
    });

    if(choice.effect.expGained && choice.effect.expGained > 0) addLog(`Kinh nghiệm tăng thêm ${choice.effect.expGained}!`, 'event');
    if(choice.effect.expGained && choice.effect.expGained < 0) addLog(`Kinh nghiệm giảm đi ${Math.abs(choice.effect.expGained)}!`, 'danger');
    
    setCurrentEncounter(null);
  }, [player, addLog]);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8">
          {!player ? (
            <div className="panel max-w-lg mx-auto">
              <StartScreen onStart={handleStartGame} />
            </div>
          ) : currentEncounter ? (
            <div className="panel max-w-2xl mx-auto">
             <EncounterScreen encounter={currentEncounter} onResolve={handleResolveEncounter} />
            </div>
          ) : (
            <GameScreen
              player={player}
              log={log}
              onCultivate={handleCultivate}
              onBreakthrough={handleBreakthrough}
              onStartEncounter={handleStartEncounter}
              isLoading={isLoading}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
