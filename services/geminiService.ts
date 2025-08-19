
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiEventResponse, GeminiEncounterResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not defined in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const eventSchema = {
  type: Type.OBJECT,
  properties: {
    eventName: {
        type: Type.STRING,
        description: "Tên ngắn gọn của sự kiện, ví dụ: 'Gặp Kỳ Ngộ', 'Nhặt Được Bí Cảnh'."
    },
    description: {
      type: Type.STRING,
      description: "Một đoạn văn mô tả sự kiện tu tiên một cách sinh động (2-3 câu). Nên mang phong cách truyện tiên hiệp."
    },
    effect: {
      type: Type.OBJECT,
      properties: {
        expGained: {
          type: Type.NUMBER,
          description: "Lượng kinh nghiệm (tu vi) nhận được (số dương) hoặc mất đi (số âm). Giá trị nên hợp lý với cảnh giới hiện tại."
        },
        thoNguyenChange: {
          type: Type.NUMBER,
          description: "Số năm thọ nguyên tăng thêm (số dương) hoặc giảm đi (số âm)."
        }
      },
      required: ["expGained", "thoNguyenChange"]
    }
  },
  required: ["eventName", "description", "effect"]
};

const encounterSchema = {
  type: Type.OBJECT,
  properties: {
    description: {
      type: Type.STRING,
      description: "Mô tả một tình huống kỳ ngộ bất ngờ, mang phong cách tiên hiệp (2-4 câu)."
    },
    choices: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          text: {
            type: Type.STRING,
            description: "Đoạn text ngắn gọn cho lựa chọn của người chơi (ví dụ: 'Thử thăm dò', 'Lặng lẽ rời đi')."
          },
          outcome: {
            type: Type.STRING,
            description: "Mô tả kết quả của lựa chọn này (2-3 câu)."
          },
          effect: {
            type: Type.OBJECT,
            properties: {
              expGained: {
                type: Type.NUMBER,
                description: "Lượng kinh nghiệm (tu vi) thay đổi."
              },
              thoNguyenChange: {
                type: Type.NUMBER,
                description: "Số năm thọ nguyên thay đổi."
              }
            },
            required: ["expGained", "thoNguyenChange"]
          }
        },
        required: ["text", "outcome", "effect"]
      }
    }
  },
  required: ["description", "choices"]
};

export const generateRandomEvent = async (currentRealm: string): Promise<GeminiEventResponse | null> => {
  try {
    const prompt = `Tạo một sự kiện ngẫu nhiên cho một người chơi trong game tu tiên văn bản.
    - Cảnh giới hiện tại của người chơi: ${currentRealm}.
    - Sự kiện có thể là một cơ duyên (nhặt được linh dược, gặp cao nhân) hoặc một tiểu nạn (gặp yêu thú, tu luyện tẩu hỏa nhập ma).
    - Lượng kinh nghiệm (exp) và thọ nguyên thay đổi phải hợp lý với cảnh giới ${currentRealm}. Ví dụ ở cảnh giới thấp thì không thể nhận được hàng vạn kinh nghiệm.
    - Giữ mô tả ngắn gọn và mang đậm không khí tiên hiệp.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: eventSchema,
        temperature: 1,
      },
    });

    const jsonText = response.text.trim();
    const eventData: GeminiEventResponse = JSON.parse(jsonText);
    return eventData;

  } catch (error) {
    console.error("Lỗi gọi Gemini API (event):", error);
    return null;
  }
};

export const generateEncounter = async (currentRealm: string): Promise<GeminiEncounterResponse | null> => {
  try {
    const prompt = `Tạo một tình huống kỳ ngộ ngẫu nhiên cho người chơi trong game tu tiên.
    - Cảnh giới hiện tại: ${currentRealm}.
    - Tình huống nên có một mô tả ngắn (2-4 câu) và chính xác 3 lựa chọn.
    - Mỗi lựa chọn phải có rủi ro và phần thưởng, không có lựa chọn nào là an toàn tuyệt đối.
    - Hiệu ứng (thay đổi kinh nghiệm, thọ nguyên) phải hợp lý với cảnh giới của người chơi.
    - Ví dụ: Gặp một sơn động tỏa linh khí. Lựa chọn: 1. Vào thăm dò, 2. Đánh dấu rồi đi, 3. Bỏ qua.
    - Kết quả phải ở định dạng JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: encounterSchema,
        temperature: 1.0,
      },
    });

    const jsonText = response.text.trim();
    const encounterData: GeminiEncounterResponse = JSON.parse(jsonText);
    
    if (encounterData.choices && encounterData.choices.length >= 2 && encounterData.choices.length <= 4) {
      return encounterData;
    } else {
       console.warn("Generated encounter does not have 2-4 choices. Retrying might be needed.");
       // Returning data even if choice count is off, to prevent soft-locks.
       return encounterData;
    }

  } catch (error) {
    console.error("Lỗi gọi Gemini API (encounter):", error);
    return null;
  }
};
