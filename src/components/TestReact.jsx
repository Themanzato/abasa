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
    <section className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
      {!soloOfertas && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="border-2 border-gray-200 rounded-lg px-5 py-3 w-full sm:w-1/2 focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c] transition-all duration-300 text-gray-700 placeholder-gray-400 font-sans font-normal"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <div className="relative">
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="appearance-none border-2 border-gray-300 rounded-xl px-5 py-3 pr-12 w-full sm:w-auto bg-gradient-to-br from-white to-gray-50 text-gray-800 font-sans font-semibold cursor-pointer shadow-md hover:shadow-lg hover:border-[#b91c1c] hover:from-white hover:to-red-50 focus:ring-4 focus:ring-red-100 focus:border-[#b91c1c] focus:shadow-xl transition-all duration-300 ease-in-out outline-none"
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat} className="bg-white text-gray-800">{cat}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <div className="bg-[#b91c1c] rounded-lg p-1.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((item) => (
            <a
              key={item.id}
              href={`/item/${item.slug}`}
              className="group block bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden transform hover:scale-105 hover:-translate-y-0.5"
            >
              <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden relative">
                {soloOfertas && (
                  <div className="absolute top-2 right-2 z-10 bg-[#b91c1c] text-white px-2 py-1 rounded-md shadow-lg">
                    <span className="text-xs font-sans font-bold uppercase tracking-wide">Oferta</span>
                  </div>
                )}
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out hover:opacity-90"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-sans font-semibold text-gray-800 mb-3 group-hover:text-[#b91c1c] transition-colors duration-300 line-clamp-2 tracking-tight">
                  {item.nombre}
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-normal text-gray-500 uppercase tracking-wide">
                    {item.categoria}
                  </span>
                  <div className="flex flex-col items-end">
                    {soloOfertas && item.precioOriginal && (
                      <p className="text-xs font-sans font-normal text-gray-400 line-through">
                        ${item.precioOriginal.toFixed(2)}
                      </p>
                    )}
                    <p className="text-2xl font-sans font-semibold text-[#b91c1c]">
                      ${item.precio.toFixed(2)}
                    </p>
                    {soloOfertas && item.descuento && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-[#b91c1c] text-xs font-sans font-semibold rounded-full">
                        -{item.descuento}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="font-sans font-normal text-gray-600 text-lg leading-relaxed">No se encontraron productos.</p>
          </div>
        )}
      </div>
    </section>
  );
}
