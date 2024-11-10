import { IChapter } from '@/app/models/Chapter';

type CardSectionProps = {
  cards: IChapter['cards'];
};

export default function CardSection({ cards = [] }: CardSectionProps) {
  const cardList = Array.isArray(cards) ? cards : [];
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#1A1C1E]">Study Cards</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            All
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            New ({cardList.length})
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {cardList.map(card => (
          <div
            key={`${card.id}-${card.question}`}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer">
            <h3 className="text-lg font-medium text-[#1A1C1E] mb-3">{card.question}</h3>
            <p className="text-gray-600">{card.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
