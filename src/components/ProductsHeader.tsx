import bg from "../assets/product.jpg";

const ProductsHeader = () => {
  return (
    <section
      className={`py-16 md:py-24 bg-center bg-cover relative transition-all mt-20 duration-1000 ease-out ${"opacity-100 translate-y-0"}`}
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Medical Technology
            <span className="block text-gradient">Products</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
            Discover our comprehensive range of innovative medical systems
            designed to transform healthcare delivery and improve patient
            outcomes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsHeader;
