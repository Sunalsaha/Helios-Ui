const ProductsHeader = () => {
  return (
    <div
      className="mt-20 py-16 text-center relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #fce2bb, #fff3e5, #ffffff)",
      }}
    >
      {/* Soft radial glow for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,255,255,0.6) 0%, transparent 70%)",
        }}
      />

      <h1 className="relative text-4xl font-bold text-gray-800 tracking-tight">
        Our Products
      </h1>
    </div>
  );
};

export default ProductsHeader;