
import React, { useState, useCallback, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EncounterScreen from './components/EncounterScreen';
import { Player, Realm, SpiritualRoot, GameEvent, GeminiEncounterResponse, EncounterChoice } from './types';
import { REALMS, SPIRITUAL_ROOTS } from './constants';
import { generateRandomEvent, generateEncounter } from './services/geminiService';

const App: React.FC = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [log, setLog] = useState<GameEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentEncounter, setCurrentEncounter] = useState<GeminiEncounterResponse | null>(null);

  const addLog = useCallback((message: string, type: GameEvent['type'] = 'system') => {
    setLog(prevLog => [{ message, type, timestamp: new Date() }, ...prevLog.slice(0, 99)]);
  }, []);

  const handleStartGame = (name: string) => {
    const randomRoot = SPIRITUAL_ROOTS[Math.floor(Math.random() * SPIRITUAL_ROOTS.length)];
    const initialPlayer: Player = {
      name,
      realm: REALMS[0],
      cultivation: 0,
      lifespan: 100,
      spiritualRoot: randomRoot,
    };
    setPlayer(initialPlayer);
    addLog(`Chào mừng đạo hữu ${name} bước vào con đường tu tiên.`, 'system');
    addLog(`Linh căn của bạn là: ${randomRoot.name}. Tốc độ tu luyện ${randomRoot.modifier * 100}%.`, 'system');
  };
  
  const handleCultivate = useCallback(async () => {
    if (!player) return;
    setIsLoading(true);

    const baseGain = 100; // Increased base gain for 10s meditation
    const cultivationGained = Math.floor(baseGain * player.spiritualRoot.modifier * (player.realm.id + 1));
    const newCultivation = player.cultivation + cultivationGained;

    addLog(`Sau 10 giây tĩnh tọa, bạn nhận được ${cultivationGained} tu vi.`, 'cultivate');

    // Random event chance
    if (Math.random() < 0.15) { // 15% chance
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
              cultivation: Math.max(0, p.cultivation + cultivationGained + (effect.tuviGained || 0)),
              lifespan: p.lifespan + (effect.thoNguyenChange || 0)
            };
          });
          if(effect.tuviGained && effect.tuviGained > 0) addLog(`Tu vi tăng thêm ${effect.tuviGained}!`, 'event');
          if(effect.tuviGained && effect.tuviGained < 0) addLog(`Tu vi giảm đi ${Math.abs(effect.tuviGained)}!`, 'danger');
          if(effect.thoNguyenChange && effect.thoNguyenChange > 0) addLog(`Thọ nguyên tăng thêm ${effect.thoNguyenChange} năm!`, 'event');
          if(effect.thoNguyenChange && effect.thoNguyenChange < 0) addLog(`Thọ nguyên giảm đi ${Math.abs(effect.thoNguyenChange)} năm!`, 'danger');
        }
      } catch (error) {
        console.error("Lỗi khi tạo sự kiện:", error);
        addLog("Thiên cơ hỗn loạn, không có gì xảy ra.", 'system');
        setPlayer(p => p ? { ...p, cultivation: newCultivation } : null);
      }
    } else {
      setPlayer(p => p ? { ...p, cultivation: newCultivation } : null);
    }

    setIsLoading(false);
  }, [player, addLog]);


  const handleBreakthrough = useCallback(() => {
    if (!player || player.cultivation < player.realm.required) return;
    setIsLoading(true);

    const nextRealmIndex = player.realm.id + 1;
    if (nextRealmIndex >= REALMS.length) {
      addLog("Đạo hữu đã đạt đến đỉnh cao, vô địch thiên hạ!", 'breakthrough');
      setIsLoading(false);
      return;
    }

    const nextRealm = REALMS[nextRealmIndex];
    const successChance = 0.8 / (nextRealmIndex * 0.5);

    setTimeout(() => {
      if (Math.random() < successChance) {
        setPlayer({
          ...player,
          realm: nextRealm,
          cultivation: 0,
          lifespan: player.lifespan + nextRealm.lifespanBonus,
        });
        addLog(`Đột phá thành công! Chúc mừng đạo hữu đã tiến vào cảnh giới ${nextRealm.name}. Thọ nguyên tăng ${nextRealm.lifespanBonus} năm.`, 'breakthrough');
      } else {
        const cultivationLoss = Math.floor(player.cultivation * 0.3);
        const lifespanLoss = 10 * nextRealmIndex;
        setPlayer({
          ...player,
          cultivation: player.cultivation - cultivationLoss,
          lifespan: player.lifespan - lifespanLoss,
        });
        addLog(`Đột phá thất bại! Cảnh giới bất ổn, tu vi tổn thất ${cultivationLoss}, thọ nguyên giảm ${lifespanLoss} năm.`, 'danger');
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
    
    addLog(`[Lựa chọn] ${choice.text}`, 'encounter');
    addLog(`[Kết quả] ${choice.outcome}`, 'encounter');

    setPlayer(p => {
      if (!p) return null;
      return {
        ...p,
        cultivation: Math.max(0, p.cultivation + (choice.effect.tuviGained || 0)),
        lifespan: p.lifespan + (choice.effect.thoNguyenChange || 0)
      };
    });

    if(choice.effect.tuviGained && choice.effect.tuviGained > 0) addLog(`Tu vi tăng thêm ${choice.effect.tuviGained}!`, 'event');
    if(choice.effect.tuviGained && choice.effect.tuviGained < 0) addLog(`Tu vi giảm đi ${Math.abs(choice.effect.tuviGained)}!`, 'danger');
    if(choice.effect.thoNguyenChange && choice.effect.thoNguyenChange > 0) addLog(`Thọ nguyên tăng thêm ${choice.effect.thoNguyenChange} năm!`, 'event');
    if(choice.effect.thoNguyenChange && choice.effect.thoNguyenChange < 0) addLog(`Thọ nguyên giảm đi ${Math.abs(choice.effect.thoNguyenChange)} năm!`, 'danger');

    setCurrentEncounter(null);
  }, [player, addLog]);


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 md:p-8 selection:bg-yellow-500/30">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-500 pb-2">
            Vĩnh Sinh Chi Mộng
          </h1>
          <p className="text-gray-400 italic">Con đường tu tiên vạn dặm, bắt đầu từ một bước chân.</p>
        </header>
        <main className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-2xl shadow-yellow-500/10 border border-yellow-500/20 p-6 min-h-[60vh]">
          {!player ? (
            <StartScreen onStart={handleStartGame} />
          ) : currentEncounter ? (
            <EncounterScreen encounter={currentEncounter} onResolve={handleResolveEncounter} />
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
