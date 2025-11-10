"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, SlidersHorizontal, Grid3x3, List, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PricingDisplay } from "@/components/pricing-display"
import type { Motorcycle } from "@/lib/types"

interface CollectionClientProps {
  motorcycles: (Motorcycle & { image: string | null })[]
  brands: string[]
  types: string[]
}

export function CollectionClient({ motorcycles, brands, types }: CollectionClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("display_order")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort motorcycles
  const filteredMotorcycles = useMemo(() => {
    const filtered = motorcycles.filter((moto) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        moto.name.toLowerCase().includes(searchLower) ||
        moto.description.toLowerCase().includes(searchLower) ||
        moto.engine.toLowerCase().includes(searchLower) ||
        moto.modifications.toLowerCase().includes(searchLower) ||
        moto.brand?.toLowerCase().includes(searchLower)

      // Brand filter
      const matchesBrand = selectedBrand === "all" || moto.brand === selectedBrand

      // Type filter
      const matchesType = selectedType === "all" || moto.motorcycle_type === selectedType

      // Status filter
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "available" && (!moto.status || moto.status === "stock")) ||
        moto.status === selectedStatus

      // Price range filter
      let matchesPriceRange = true
      if (priceRange !== "all") {
        const price = moto.price
        switch (priceRange) {
          case "0-5000000":
            matchesPriceRange = price < 5000000
            break
          case "5000000-10000000":
            matchesPriceRange = price >= 5000000 && price < 10000000
            break
          case "10000000-15000000":
            matchesPriceRange = price >= 10000000 && price < 15000000
            break
          case "15000000+":
            matchesPriceRange = price >= 15000000
            break
        }
      }

      return matchesSearch && matchesBrand && matchesType && matchesStatus && matchesPriceRange
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return a.display_order - b.display_order
      }
    })

    return filtered
  }, [motorcycles, searchQuery, selectedBrand, selectedType, selectedStatus, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedBrand("all")
    setSelectedType("all")
    setSelectedStatus("all")
    setPriceRange("all")
    setSortBy("display_order")
  }

  const hasActiveFilters = searchQuery || selectedBrand !== "all" || selectedType !== "all" || selectedStatus !== "all" || priceRange !== "all"

  const getStatusBadge = (status: string | null) => {
    if (!status || status === "stock") {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Disponible</Badge>
    }
    if (status === "reserved") {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Reservada</Badge>
    }
    if (status === "sold") {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Vendida</Badge>
    }
    return null
  }

  return (
    <div className="min-h-screen bg-black pb-24 md:pb-8 md:pt-24">
      <section className="relative py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-block mb-4">
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#b87333] to-transparent mx-auto mb-6"></div>
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-wider"
              style={{
                fontFamily: 'Impact, "Arial Black", sans-serif',
                color: "#b87333",
                textShadow: "0 0 40px rgba(184, 115, 51, 0.6), 0 0 80px rgba(184, 115, 51, 0.3)",
              }}
            >
              NUESTRA COLECCIÓN
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-2">
              Motos custom seleccionadas con pasión
            </p>
            <p className="text-[#b87333] font-semibold text-base">
              {filteredMotorcycles.length} {filteredMotorcycles.length === 1 ? "motocicleta disponible" : "motocicletas disponibles"}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#b87333] to-transparent mx-auto mt-6"></div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#b87333] transition-colors" />
              <Input
                type="text"
                placeholder="Buscar por nombre, marca, motor, modificaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 focus:border-[#b87333] focus:ring-[#b87333] rounded-xl transition-all hover:border-[#b87333]/50"
              />
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-[#b87333] transition-all rounded-lg ${showFilters ? "border-[#b87333] bg-[#b87333]/10" : ""}`}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros {showFilters && "▲"}
              </Button>

              {/* Quick Filters */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-800 text-white hover:border-[#b87333] transition-colors rounded-lg">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="display_order">Destacadas</SelectItem>
                  <SelectItem value="newest">Más recientes</SelectItem>
                  <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
                  <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="ml-auto flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-[#b87333] border-[#b87333] text-white hover:bg-[#d4a574]"
                      : "bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-[#b87333]"
                  }`}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-[#b87333] border-[#b87333] text-white hover:bg-[#d4a574]"
                      : "bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-[#b87333]"
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-xl border border-[#b87333]/20 animate-fade-in bg-gradient-to-br from-zinc-900 to-zinc-950 shadow-xl">
                <div>
                  <label className="text-sm text-[#b87333] mb-2 block font-semibold uppercase tracking-wide">Marca</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger className="bg-black/50 border-zinc-700 text-white hover:border-[#b87333] transition-colors rounded-lg">
                      <SelectValue placeholder="Todas las marcas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las marcas</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-[#b87333] mb-2 block font-semibold uppercase tracking-wide">Tipo</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-black/50 border-zinc-700 text-white hover:border-[#b87333] transition-colors rounded-lg">
                      <SelectValue placeholder="Todos los tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los tipos</SelectItem>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-[#b87333] mb-2 block font-semibold uppercase tracking-wide">Precio</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="bg-black/50 border-zinc-700 text-white hover:border-[#b87333] transition-colors rounded-lg">
                      <SelectValue placeholder="Todos los precios" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los precios</SelectItem>
                      <SelectItem value="0-5000000">Hasta $5.000.000</SelectItem>
                      <SelectItem value="5000000-10000000">$5M - $10M</SelectItem>
                      <SelectItem value="10000000-15000000">$10M - $15M</SelectItem>
                      <SelectItem value="15000000+">Más de $15M</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-[#b87333] mb-2 block font-semibold uppercase tracking-wide">Estado</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="bg-black/50 border-zinc-700 text-white hover:border-[#b87333] transition-colors rounded-lg">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="available">Disponibles</SelectItem>
                      <SelectItem value="reserved">Reservadas</SelectItem>
                      <SelectItem value="sold">Vendidas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-400">Filtros activos:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="bg-zinc-800 text-white">
                    Búsqueda: {searchQuery}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearchQuery("")} />
                  </Badge>
                )}
                {selectedBrand !== "all" && (
                  <Badge variant="secondary" className="bg-zinc-800 text-white">
                    Marca: {selectedBrand}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedBrand("all")} />
                  </Badge>
                )}
                {selectedType !== "all" && (
                  <Badge variant="secondary" className="bg-zinc-800 text-white">
                    Tipo: {selectedType}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedType("all")} />
                  </Badge>
                )}
                {selectedStatus !== "all" && (
                  <Badge variant="secondary" className="bg-zinc-800 text-white">
                    Estado: {selectedStatus}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedStatus("all")} />
                  </Badge>
                )}
                {priceRange !== "all" && (
                  <Badge variant="secondary" className="bg-zinc-800 text-white">
                    Precio: {priceRange === "0-5000000" ? "Hasta $5M" : priceRange === "5000000-10000000" ? "$5M-$10M" : priceRange === "10000000-15000000" ? "$10M-$15M" : "Más de $15M"}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setPriceRange("all")} />
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-[#b87333] hover:text-[#d4a574] hover:bg-[#b87333]/10 transition-all"
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>

          {/* Motorcycles Grid/List */}
          {filteredMotorcycles.length > 0 ? (
            <div
              className={
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-6"
              }
            >
              {filteredMotorcycles.map((moto) => (
                <div
                  key={moto.id}
                  className={`group relative overflow-hidden transition-all duration-500 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 rounded-2xl animate-fade-in ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(184, 115, 51, 0.1)",
                    border: "2px solid transparent",
                    backgroundImage: "linear-gradient(to bottom right, #18181b, #09090b), linear-gradient(135deg, rgba(184, 115, 51, 0.3), transparent 50%)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 40px rgba(184, 115, 51, 0.4), 0 0 80px rgba(184, 115, 51, 0.2), inset 0 1px 0 rgba(184, 115, 51, 0.2)"
                    e.currentTarget.style.transform = "translateY(-8px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(184, 115, 51, 0.1)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-80" : "aspect-[4/3]"}`}>
                    {moto.image ? (
                      <Image
                        src={moto.image || "/placeholder.svg"}
                        alt={moto.name}
                        fill
                        sizes={
                          viewMode === "list" ? "320px" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        }
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 bg-zinc-800">Sin imagen</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">{getStatusBadge(moto.status)}</div>
                    
                    {/* Hover overlay with glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#b87333]/0 via-[#b87333]/0 to-[#b87333]/0 group-hover:from-[#b87333]/20 group-hover:via-[#b87333]/5 transition-all duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-7 flex-1 flex flex-col">
                    {/* Brand and Type */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {moto.brand && (
                        <Badge variant="outline" className="border-[#b87333] text-[#b87333] bg-[#b87333]/5 font-semibold">
                          {moto.brand}
                        </Badge>
                      )}
                      {moto.motorcycle_type && (
                        <Badge variant="outline" className="border-zinc-700 text-gray-300 bg-zinc-800/50">
                          {moto.motorcycle_type}
                        </Badge>
                      )}
                      {moto.year && (
                        <Badge variant="outline" className="border-zinc-700 text-gray-300 bg-zinc-800/50">
                          {moto.year}
                        </Badge>
                      )}
                    </div>

                    <h2
                      className="text-xl md:text-2xl font-bold mb-3 tracking-tight font-serif text-white group-hover:text-[#b87333] transition-colors duration-300"
                      style={{
                        textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {moto.name}
                    </h2>

                    <p className="text-gray-400 text-sm md:text-base mb-5 leading-relaxed line-clamp-2 flex-grow">{moto.description}</p>

                    <div className="mb-6 pb-6 border-b border-zinc-800">
                      <PricingDisplay
                        priceARS={moto.price}
                        priceUSD={moto.price_usd}
                        offerPercentage={moto.offer_percentage}
                        size="small"
                      />
                    </div>

                    <Link
                      href={`/coleccion/${moto.slug}`}
                      className="block w-full py-4 px-6 text-sm tracking-widest uppercase font-bold transition-all duration-300 relative overflow-hidden group/btn text-center rounded-xl"
                      style={{ 
                        minHeight: "52px",
                        background: "linear-gradient(135deg, #b87333 0%, #d4a574 100%)",
                        boxShadow: "0 4px 15px rgba(184, 115, 51, 0.3)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 6px 25px rgba(184, 115, 51, 0.5)"
                        e.currentTarget.style.transform = "translateY(-2px)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 4px 15px rgba(184, 115, 51, 0.3)"
                        e.currentTarget.style.transform = "translateY(0)"
                      }}
                    >
                      <span className="relative z-10 text-black flex items-center justify-center gap-2 font-extrabold">
                        VER DETALLES
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-4">
                No se encontraron motocicletas con los filtros seleccionados.
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-[#b87333] text-[#b87333] bg-transparent"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
