import { useState } from 'react';

const VoucherInput = () => {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    // Placeholder for actual apply logic
    setApplied(true);
  };

  return (
    <div className="bg-white bg-primary/20 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2 text-text">Do you have a voucher or gift card?</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Enter code"
          className="flex-1 p-2 rounded border border-secondary bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleApply}
          disabled={!code || applied}
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {applied ? 'Applied' : 'Apply Code'}
        </button>
      </div>
    </div>
  );
};

export default VoucherInput; 