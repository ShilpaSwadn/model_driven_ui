'use client';

import { useState } from 'react';
import { userData as initialUserData } from '@/data/userData';
import config from '@/config/displayConfig.yaml';

export default function DynamicDisplay() {
    const [formData, setFormData] = useState(initialUserData);
    const fieldsConfig = config.fields || {};

    const handleChange = (e, field) => {
        const { value, type, checked } = e.target;
        
        if (field.type === 'multiple_choice') {
            const currentValues = formData[field.id] || [];
            if (checked) {
                setFormData({ ...formData, [field.id]: [...currentValues, value] });
            } else {
                setFormData({ ...formData, [field.id]: currentValues.filter((v) => v !== value) });
            }
        } else {
            setFormData({ ...formData, [field.id]: value });
        }
    };

    const renderField = (fieldId, fieldConfig) => {
        const value = formData[fieldId] !== undefined ? formData[fieldId] : '';
        const commonStyle = "w-full p-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-200 text-sm";

        switch (fieldConfig.type) {
            case 'textfield':
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(e, { id: fieldId, type: fieldConfig.type })}
                        placeholder={fieldConfig.placeholder}
                        className={commonStyle}
                    />
                );
            case 'tel':
                return (
                    <input
                        type="tel"
                        value={value}
                        onChange={(e) => {
                            const numericValue = e.target.value.replace(/\D/g, '');
                            handleChange({ target: { value: numericValue } }, { id: fieldId, type: fieldConfig.type });
                        }}
                        placeholder={fieldConfig.placeholder}
                        maxLength={fieldConfig.maxLength || 10}
                        className={commonStyle}
                    />
                );
            case 'date':
                return (
                    <input
                        type="date"
                        value={value}
                        onChange={(e) => handleChange(e, { id: fieldId, type: fieldConfig.type })}
                        className={commonStyle + " cursor-pointer uppercase"}
                        style={{ colorScheme: 'dark' }}
                    />
                );
            case 'readonly':
                return (
                    <div className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 cursor-not-allowed select-none text-sm">
                        {value}
                    </div>
                );
            case 'textarea':
                return (
                    <textarea
                        value={value}
                        onChange={(e) => handleChange(e, { id: fieldId, type: fieldConfig.type })}
                        placeholder={fieldConfig.placeholder}
                        className={commonStyle + " resize-y min-h-[100px]"}
                    />
                );
            case 'dropdown':
                return (
                    <div className="relative">
                        <select
                            value={value}
                            onChange={(e) => handleChange(e, { id: fieldId, type: fieldConfig.type })}
                            className={commonStyle + " appearance-none !bg-slate-800 cursor-pointer pr-10"}
                        >
                            <option value="" disabled className="text-gray-500">Select {fieldConfig.label}</option>
                            {fieldConfig.options?.map((opt) => (
                                <option key={opt} value={opt} className="text-white bg-slate-800">{opt}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                );
            case 'radio':
                return (
                    <div className="flex flex-wrap gap-5 pt-1">
                        {fieldConfig.options?.map((opt) => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center justify-center w-5 h-5">
                                    <input
                                        type="radio"
                                        name={fieldId}
                                        value={opt}
                                        checked={value === opt}
                                        onChange={(e) => handleChange(e, { id: fieldId, type: fieldConfig.type })}
                                        className="peer appearance-none w-5 h-5 border-[1.5px] border-white/40 rounded-full checked:border-blue-400 transition-colors cursor-pointer"
                                    />
                                    <div className="absolute w-2.5 h-2.5 bg-blue-400 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                                </div>
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{opt}</span>
                            </label>
                        ))}
                    </div>
                );
            case 'multiple_choice':
                const selectedValues = Array.isArray(formData[fieldId]) ? formData[fieldId] : [];
                return (
                    <div className="flex flex-wrap gap-4 pt-1">
                        {fieldConfig.options?.map((opt) => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center justify-center w-5 h-5">
                                    <input
                                        type="checkbox"
                                        value={opt}
                                        checked={selectedValues.includes(opt)}
                                        onChange={(e) => handleChange(e, { id: fieldId, type: fieldConfig.type })}
                                        className="peer appearance-none w-5 h-5 border-[1.5px] border-white/40 rounded checked:border-transparent checked:bg-blue-500 transition-colors cursor-pointer"
                                    />
                                    <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{opt}</span>
                            </label>
                        ))}
                    </div>
                );
            default:
                return (
                    <span className="text-gray-400 italic text-sm">Unsupported field type: {fieldConfig.type}</span>
                );
        }
    };

    const getOrderedFormData = () => {
        const ordered = {};
        // Add keys in the order they appear in displayConfig.yaml
        Object.keys(fieldsConfig).forEach((key) => {
            if (formData[key] !== undefined) {
                ordered[key] = formData[key];
            }
        });
        // Append any remaining keys that weren't in the config
        Object.keys(formData).forEach((key) => {
            if (ordered[key] === undefined) {
                ordered[key] = formData[key];
            }
        });
        return ordered;
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white/[0.03] backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 text-white">
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                User Profile Configurator
            </h2>
            
            <div className="space-y-6">
                {Object.entries(fieldsConfig).length > 0 ? (
                    Object.entries(fieldsConfig).map(([fieldId, fieldConfig]) => (
                        <div key={fieldId} className="group relative">
                            <label className="block text-sm font-medium text-gray-300 mb-2 ml-1 transition-colors group-focus-within:text-blue-400">
                                {fieldConfig.label}
                                {fieldConfig.type === 'readonly' && <span className="ml-2 text-[10px] tracking-wide px-1.5 py-0.5 bg-white/10 font-semibold rounded text-gray-400 uppercase">Read Only</span>}
                            </label>
                            {renderField(fieldId, fieldConfig)}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-400">
                        No fields configured in displayConfig.yaml
                    </div>
                )}
            </div>
            
            <div className="mt-10 p-5 bg-[#0a0f1d] rounded-xl border border-white/5 shadow-inner">
                <h3 className="text-sm font-semibold mb-3 text-indigo-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Live Data State JSON
                </h3>
                <pre className="text-xs text-green-400 overflow-x-auto font-mono bg-black/50 p-3 rounded-lg border border-white/5">
                    {JSON.stringify(getOrderedFormData(), null, 2)}
                </pre>
            </div>
        </div>
    );
}
