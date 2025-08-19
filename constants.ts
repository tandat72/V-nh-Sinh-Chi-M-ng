
import { Realm, SpiritualRoot } from './types';

export const SPIRITUAL_ROOTS: SpiritualRoot[] = [
  { name: 'Phàm Căn', modifier: 0.8, description: 'Tư chất bình thường, tu luyện chậm chạp.' },
  { name: 'Chân Linh Căn', modifier: 1.0, description: 'Tư chất khá, tốc độ tu luyện ổn định.' },
  { name: 'Địa Linh Căn', modifier: 1.2, description: 'Tư chất tốt, tu luyện nhanh hơn người thường.' },
  { name: 'Thiên Linh Căn', modifier: 1.5, description: 'Tư chất tuyệt đỉnh, ngàn năm khó gặp.' },
  { name: 'Hỗn Độn Linh Căn', modifier: 2.0, description: 'Vạn cổ vô nhất, tốc độ tu luyện không thể đo lường.' },
];

export const REALMS: Realm[] = [
  { id: 0, name: 'Luyện Thể Tầng 1', required: 100, lifespanBonus: 5 },
  { id: 1, name: 'Luyện Thể Tầng 2', required: 250, lifespanBonus: 5 },
  { id: 2, name: 'Luyện Thể Tầng 3', required: 500, lifespanBonus: 5 },
  { id: 3, name: 'Luyện Thể Tầng 4', required: 1000, lifespanBonus: 10 },
  { id: 4, name: 'Trúc Cơ Kỳ', required: 5000, lifespanBonus: 50 },
  { id: 5, name: 'Kim Đan Kỳ', required: 25000, lifespanBonus: 100 },
  { id: 6, name: 'Nguyên Anh Kỳ', required: 100000, lifespanBonus: 200 },
  { id: 7, name: 'Hóa Thần Kỳ', required: 500000, lifespanBonus: 500 },
  { id: 8, name: 'Đại Thừa Kỳ', required: 50000000, lifespanBonus: 10000 },
];
