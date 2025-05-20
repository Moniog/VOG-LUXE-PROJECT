```typescript
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface CategoryFiltersProps {
  filters: FilterGroup[];
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ filters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const activeFilters = Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
    if (!['sort', 'page'].includes(key)) {
      acc[key] = value.split(',');
    }
    return acc;
  }, {} as Record<string, string[]>);

  const handleFilterChange = (groupId: string, value: string) => {
    const currentValues = searchParams.get(groupId)?.split(',') || [];
    let newValues: string[];

    if (currentValues.includes(value)) {
      newValues = currentValues.filter(v => v !== value);
    } else {
      newValues = [...currentValues, value];
    }

    setSearchParams(prev => {
      if (newValues.length === 0) {
        prev.delete(groupId);
      } else {
        prev.set(groupId, newValues.join(','));
      }
      return prev;
    });
  };

  const clearAllFilters = () => {
    setSearchParams(prev => {
      Array.from(prev.keys()).forEach(key => {
        if (!['sort', 'page'].includes(key)) {
          prev.delete(key);
        }
      });
      return prev;
    });
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <div className="space-y-6">
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Active Filters</h3>
          <button
            onClick={clearAllFilters}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Clear All
          </button>
        </div>
      )}

      {filters.map((group) => (
        <div key={group.id} className="space-y-4">
          <h3 className="text-lg font-medium text-white">{group.label}</h3>
          <div className="space-y-2">
            {group.options.map((option) => {
              const isActive = activeFilters[group.id]?.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handleFilterChange(group.id, option.value)}
                    className="w-4 h-4 rounded border-gray-700/50 bg-gray-800/50 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {option.label}
                  </span>
                  {isActive && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleFilterChange(group.id, option.value);
                      }}
                      className="ml-auto p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilters;
```