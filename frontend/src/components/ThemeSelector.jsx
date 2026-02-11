import React from 'react';
import { PaletteIcon } from 'lucide-react';
import { Themes } from '../constants';
import { useThemeStore } from '../../store/useThemeStore';

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  console.log(theme);

  return (
    <div className="dropdown dropdown-end">
      {/* Dropdown trigger */}
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle"
        aria-label="Change theme"
      >
        <PaletteIcon className="size-5" />
      </button>

      {/* Dropdown content */}
      <div
        tabIndex={0}
        className="dropdown-content z-[1] mt-2 menu p-2 shadow bg-base-100 rounded-box w-56"
      >
        {Array.isArray(Themes) &&
          Themes.map((themeOption) => (
            <button
              key={themeOption.name}
              type="button"
              onClick={() => setTheme(themeOption.name)}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${
                  theme === themeOption.name
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-base-200'
                }
              `}
            >
              {/* Icon */}
              <PaletteIcon className="size-4 shrink-0" />

              {/* Theme name */}
              <span className="text-sm font-medium capitalize">
                {themeOption.label}
              </span>

              {/* Theme preview colors */}
              <div className="ml-auto flex gap-1">
                {Array.isArray(themeOption.colors) &&
                  themeOption.colors.map((color, index) => (
                    <span
                      key={`${themeOption.name}-${index}`}
                      className="size-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
