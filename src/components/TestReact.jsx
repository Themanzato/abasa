import { useState, useMemo } from "react";

export default function TestReact({ productos, soloOfertas = false }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  const productosConOfertas = useMemo(() => {
    if (!soloOfertas) return productos;
    return productos.slice(0, 3).map((producto, index) => ({
      ...producto,
      precioOriginal: producto.precio,
      precio: producto.precio * (1 - (15 + (index * 5)) / 100),
      descuento: 15 + (index * 5)
    }));
  }, [productos, soloOfertas]);

  const categorias = useMemo(() => ["Todos", ...new Set(productosConOfertas.map(p => p.categoria))], [productosConOfertas]);

  const productosFiltrados = useMemo(() => {
    return productosConOfertas.filter(p => {
      const matchBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const matchCategoria = categoria === "Todos" || p.categoria === categoria;
      return matchBusqueda && matchCategoria;
    });
  }, [busqueda, categoria, productosConOfertas]);

  return (
    <section className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8 w-full overflow-hidden max-w-full">
      {!soloOfertas && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="border-2 border-gray-200 rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 w-full sm:w-1/2 focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c] transition-all duration-300 text-sm sm:text-base text-gray-700 placeholder-gray-400 font-sans font-normal"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <div className="relative">
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="appearance-none border-2 border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 pr-10 sm:pr-11 md:pr-12 w-full sm:w-auto bg-gradient-to-br from-white to-gray-50 text-xs sm:text-sm md:text-base text-gray-800 font-sans font-semibold cursor-pointer shadow-md hover:shadow-lg hover:border-[#b91c1c] hover:from-white hover:to-red-50 focus:ring-4 focus:ring-red-100 focus:border-[#b91c1c] focus:shadow-xl transition-all duration-300 ease-in-out outline-none"
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat} className="bg-white text-gray-800">{cat}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none">
              <div className="bg-[#b91c1c] rounded-lg p-1 sm:p-1.5">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((item) => (
            <a
              key={item.id}
              href={`/item/${item.slug}`}
              className="group block bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden transform hover:scale-105 hover:-translate-y-0.5"
            >
              <div className="w-full h-48 sm:h-56 md:h-60 lg:h-64 bg-white flex items-center justify-center overflow-hidden relative">
                {soloOfertas && (
                  <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 z-10 bg-[#b91c1c] text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md shadow-lg">
                    <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wide">Oferta</span>
                  </div>
                )}
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out hover:opacity-90"
                />
              </div>
              <div className="p-3 sm:p-4 md:p-5">
                <h2 className="text-base sm:text-lg md:text-xl font-sans font-semibold text-gray-800 mb-2 sm:mb-3 group-hover:text-[#b91c1c] transition-colors duration-300 line-clamp-2 tracking-tight leading-tight">
                  {item.nombre}
                </h2>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[10px] sm:text-xs font-sans font-normal text-gray-500 uppercase tracking-wide">
                    {item.categoria}
                  </span>
                  <div className="flex flex-col items-end">
                    {soloOfertas && item.precioOriginal && (
                      <p className="text-[10px] sm:text-xs font-sans font-normal text-gray-400 line-through">
                        ${item.precioOriginal.toFixed(2)}
                      </p>
                    )}
                    <p className="text-lg sm:text-xl md:text-2xl font-sans font-semibold text-[#b91c1c]">
                      ${item.precio.toFixed(2)}
                    </p>
                    {soloOfertas && item.descuento && (
                      <span className="inline-block mt-0.5 sm:mt-1 px-1.5 sm:px-2 py-0.5 bg-red-100 text-[#b91c1c] text-[10px] sm:text-xs font-sans font-semibold rounded-full">
                        -{item.descuento}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-full text-center py-8 sm:py-10 md:py-12">
            <p className="font-sans font-normal text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">No se encontraron productos.</p>
          </div>
        )}
      </div>
    </section>
  );
}
