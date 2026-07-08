'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { getNames, getCode } from 'country-list';
import Chevron from './SVGs/Chevron';

// Unified option type
export interface OptionType {
  value: string;
  label: string;
  id?: number
}

// Props — now with optional isCountry flag
interface CustomSelectProps {
  options?: OptionType[];                    // Normal mode: you pass options
  value: OptionType | null;
  onChange: (option: OptionType | null) => void;
  placeholder?: string;
  isCountry?: boolean;                       // NEW: turns it into country picker
  width?: string;
  className?: string;
}

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  isCountry = false,
  width = 'w-full',
  className = '',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const BLOCKED_COUNTRIES = ["IL"];

  const countryOptions = useMemo(() => {
    if (!isCountry) return [];

    return getNames()
      .map((name) => {
        const code = getCode(name);
        return {
          value: name,
          label: name,
          code, // keep ISO code internally
        };
      })
      .filter(
        (country) =>
          country.code && !BLOCKED_COUNTRIES.includes(country.code)
      )
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [isCountry]);


  // Use country list if isCountry, otherwise use passed options
  const displayOptions = isCountry ? countryOptions : options;

  // Filter options when searching (only when isCountry mode needs search)
  const filteredOptions = useMemo(() => {
    if (!isOpen || !isCountry) return displayOptions;

    const lowerSearch = search.toLowerCase();
    return displayOptions.filter(
      opt =>
        opt.label.toLowerCase().includes(lowerSearch) ||
        (isCountry && getCode(opt.value)?.toLowerCase().includes(lowerSearch))
    );
  }, [displayOptions, search, isOpen, isCountry]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search when dropdown opens (only in country mode)
  useEffect(() => {
    if (isOpen && isCountry && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isCountry]);

  const handleSelect = (option: OptionType) => {
    onChange(option);
    setIsOpen(false);
    setSearch('');
  };

  const toggleDropdown = () => setIsOpen(prev => !prev);

  return (
    <div ref={dropdownRef} className={`relative ${width}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={`rounded-full px-6 py-[15px] text-[#212C66] bg-[#F5F5F5] focus:border-[#00CDFE] focus:outline-none border border-[#FCFCFC] flex items-center justify-between w-full cursor-pointer transition-all hover:border-[#00CDFE] ${className}`}
      >
        <span className={value ? 'text-[#212C66]' : 'text-[#D0D4DA]'}>
          {value ? value.label : placeholder}
        </span>
        <Chevron
          className={`w-5 h-5 text-[#212C66] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#F5F5F5] border border-[#E2E5E9] rounded-2xl shadow-lg z-50 overflow-hidden">
          {/* Search bar — only shown in country mode */}
          {isCountry && (
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full px-5 py-3 bg-[#F9F9F9] border-b border-[#E2E5E9] outline-none text-[#212C66] text-sm"
              onClick={(e) => e.stopPropagation()}
            />
          )}

          {/* Options List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-5 py-8 text-center text-[#888]">No options found</div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-5 py-3 hover:bg-[#F5F5F5] transition-colors ${value?.value === option.value ? 'bg-[#EDF9FD]' : ''
                    }`}
                >
                  <span className="text-[#212C66]">{option.label}</span>
                  {isCountry && getCode(option.value) && (
                    <span className="ml-2 text-sm text-[#888]">
                      ({getCode(option.value)})
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}