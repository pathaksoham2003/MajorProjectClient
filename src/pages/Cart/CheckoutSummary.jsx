import PropTypes from 'prop-types';

const CheckoutSummary = ({ cartTotal, checkoutLoading, onCheckout }) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-text/10 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-text">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-text">
            <span>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="flex justify-between text-text">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="border-t border-primary pt-2 mt-2">
            <div className="flex justify-between font-semibold text-text">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onCheckout}
          disabled={checkoutLoading}
          className="w-full mt-6 bg-primary text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
};

CheckoutSummary.propTypes = {
  cartTotal: PropTypes.number.isRequired,
  checkoutLoading: PropTypes.bool.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

export default CheckoutSummary; 