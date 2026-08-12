import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, Layers, Filter } from 'lucide-react';
import { ALL_PRODUCTS, MAIN_SECTIONS } from '../data/catalogData';

export const CustomMaterialPicker = ({ selectedProductId, onSelectProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const pickerRef = useRef(null);

  const currentProduct = ALL_PRODUCTS.find(p => p.id === selectedProductId) || ALL_PRODUCTS[1];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const CATEGORY_TABS = [
    { id: 'all', label: 'Усі матеріали' },
    { id: 'sheben', label: 'Щебінь' },
    { id: 'shps', label: 'Шлак & ЩПС' },
    { id: 'pesok', label: 'Пісок' },
    { id: 'otsiv', label: 'Відсів' },
    { id: 'keramzit', label: 'Керамзит' },
    { id: 'grunty', label: 'Ґрунти' }
  ];

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.sectionId === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="cmp-wrapper" ref={pickerRef}>
      {/* Trigger Button Bar */}
      <button
        type="button"
        className={`cmp-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="cmp-trigger-info">
          <Layers size={18} className="cmp-icon-green" />
          <div className="cmp-trigger-text">
            <span className="cmp-trigger-name">{currentProduct.name}</span>
            <span className="cmp-trigger-price">від {currentProduct.price} {currentProduct.priceUnit || 'грн/т'}</span>
          </div>
        </div>
        <ChevronDown size={18} className={`cmp-chevron ${isOpen ? 'rotate' : ''}`} />
      </button>

      {/* Dropdown Popup Card */}
      {isOpen && (
        <div className="cmp-dropdown-menu animate-fade">
          {/* Header Search & Filters */}
          <div className="cmp-menu-header">
            <div className="cmp-search-box">
              <Search size={15} className="cmp-search-icon" />
              <input
                type="text"
                placeholder="Швидкий пошук матеріалу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cmp-search-input"
                autoFocus
              />
              {searchQuery && (
                <button type="button" className="cmp-clear-search" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="cmp-cat-tabs">
              {CATEGORY_TABS.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`cmp-cat-chip ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid List */}
          <div className="cmp-products-list">
            {filteredProducts.length === 0 ? (
              <div className="cmp-empty-state">
                За вашим запитом <strong>"{searchQuery}"</strong> матеріалів не знайдено. Спробуйте змінити критерії пошуку.
              </div>
            ) : (
              filteredProducts.map((p) => {
                const isSelected = p.id === selectedProductId;
                return (
                  <div
                    key={p.id}
                    className={`cmp-product-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      onSelectProduct(p.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="cmp-pc-left">
                      <div className="cmp-pc-title-row">
                        <strong className="cmp-pc-title">{p.name}</strong>
                        {isSelected && <Check size={16} className="cmp-check-icon" />}
                      </div>
                      <p className="cmp-pc-desc">
                        {p.fractions && p.fractions.length > 0
                          ? `Доступні фракції: ${p.fractions.join(', ')}`
                          : p.description}
                      </p>
                    </div>

                    <div className="cmp-pc-right">
                      <span className="cmp-pc-price">
                        {p.price} <small>{p.priceUnit || 'грн/т'}</small>
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
