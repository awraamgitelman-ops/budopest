import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { ALL_PRODUCTS, MAIN_SECTIONS } from '../data/catalogData';

export const SearchModal = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');

  const allItems = useMemo(() => {
    const list = [];
    
    // Add all products with their sections
    ALL_PRODUCTS.forEach(p => {
      const section = MAIN_SECTIONS.find(s => s.id === p.sectionId);
      list.push({
        id: p.id,
        name: p.name,
        category: section ? section.name : 'Нерудні матеріали',
        price: `від ${p.price} ${p.priceUnit}${p.priceM3 ? ` (${p.priceM3} грн/м³)` : ''}`
      });

      if (p.fractions) {
        p.fractions.forEach(f => {
          list.push({
            id: `${p.id}-${f}`,
            name: `${p.name} (${f})`,
            category: section ? section.name : 'Фракції',
            price: `від ${p.price} ${p.priceUnit}`
          });
        });
      }
    });

    return list;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    const q = query.toLowerCase().trim();
    return allItems.filter(item => 
      item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    ).slice(0, 15);
  }, [query, allItems]);

  if (!isOpen) return null;

  return (
    <div className="search-backdrop animate-fade" onClick={onClose}>
      <div className="search-window animate-slide" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-row">
          <Search size={22} className="search-icon" />
          <input
            type="text"
            autoFocus
            placeholder="Пошук матеріалу, фракції чи послуги у Дніпрі..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-main-input"
          />
          <button onClick={onClose} className="search-close" aria-label="Закрити">
            <X size={20} />
          </button>
        </div>

        <div className="search-results-list">
          {results.length > 0 ? (
            results.map((res) => (
              <div
                key={res.id}
                className="search-result-item"
                onClick={() => {
                  onSelectProduct({ name: res.name, priceStr: res.price });
                  onClose();
                }}
              >
                <div className="sri-info">
                  <span className="sri-cat">{res.category}</span>
                  <span className="sri-name">{res.name}</span>
                </div>
                <div className="sri-right">
                  <span className="sri-price">{res.price}</span>
                  <ArrowRight size={15} className="sri-arrow" />
                </div>
              </div>
            ))
          ) : (
            <div className="search-empty">
              За запитом «{query}» нічого не знайдено. Спробуйте змінити запит або зателефонуйте нам за номером <strong>+380 (98) 861-29-38</strong>.
            </div>
          )}
        </div>
      </div>

      <style>{`
        .search-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(5px);
          z-index: 2100;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 80px 20px 20px;
        }

        .search-window {
          background: #ffffff;
          border-radius: var(--radius-lg);
          max-width: 680px;
          width: 100%;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
        }

        .search-input-row {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e2e8f0;
          gap: 12px;
        }

        .search-icon {
          color: var(--c-green);
          flex-shrink: 0;
        }

        .search-main-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1.15rem;
          color: #0f172a;
          font-family: inherit;
        }

        .search-close {
          color: #94a3b8;
          padding: 4px;
          border-radius: 4px;
        }

        .search-close:hover {
          color: #0f172a;
          background: #f1f5f9;
        }

        .search-results-list {
          max-height: 420px;
          overflow-y: auto;
          padding: 8px 0;
        }

        .search-result-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .search-result-item:hover {
          background: var(--c-green-light);
        }

        .sri-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sri-cat {
          font-size: 0.72rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .sri-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1e293b;
        }

        .sri-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sri-price {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--c-green-dark);
        }

        .sri-arrow {
          color: #cbd5e1;
        }

        .search-result-item:hover .sri-arrow {
          color: var(--c-green-dark);
          transform: translateX(3px);
        }

        .search-empty {
          padding: 36px 24px;
          text-align: center;
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.5;
        }

        .search-empty strong {
          color: var(--c-green-dark);
        }
      `}</style>
    </div>
  );
};
