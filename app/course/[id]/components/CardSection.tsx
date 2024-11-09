interface Card {
  id: string;
  question: string;
  answer: string;
}

interface CardSectionProps {
  cards: Card[];
}

export default function CardSection({ cards }: CardSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#1A1C1E]">学习卡片</h2>
        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800
                           hover:bg-gray-50 rounded-lg transition-colors duration-200">
            All
          </button>
          <button
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800
                           hover:bg-gray-50 rounded-lg transition-colors duration-200">
            New (62)
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {cards.map(card => (
          <div
            key={card.id}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md
                     transition-all duration-200 cursor-pointer">
            <h3 className="text-lg font-medium text-[#1A1C1E] mb-3">{card.question}</h3>
            <p className="text-gray-600">{card.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
