import { createFileRoute, Link } from "@tanstack/react-router";
import { getServiceBySlug, servicesData } from "@/lib/services-data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeftIcon } from "@/components/Icons";

export const Route = createFileRoute("/hizmetler/$slug")({
  component: ServicePage,
  head: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    return {
      meta: [
        { title: `${service?.title || "Hizmetlerimiz"} — Stella Cafe & Lounge` },
        {
          name: "description",
          content: service?.description || "Stella Cafe & Lounge hizmetleri.",
        },
      ],
    };
  },
});

function ServicePage() {
  const { slug } = Route.useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="font-display text-4xl text-primary mb-4">Hizmet Bulunamadı</h1>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const otherServices = servicesData.filter(s => s.id !== service.id);

  return (
    <main className="w-full bg-background text-foreground overflow-x-hidden pt-24 min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 py-12 lg:py-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 font-sans text-xs uppercase tracking-widest font-semibold"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Geri Dön</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="animate-fade-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-transparent" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] mb-6">
              {service.title}
            </h1>

            <p className="font-sans text-xl text-primary/80 mb-8 font-light">
              {service.description}
            </p>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-[15px]">
              <p>{service.content}</p>
            </div>

            <div className="mt-12">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-xs font-bold text-black transition-colors hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] uppercase tracking-widest"
              >
                Menüyü Keşfet
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] sm:h-[500px] lg:h-[650px] w-full rounded-3xl overflow-hidden border border-border/40 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
        </div>

        {/* Diğer Hizmetlerimiz */}
        <div className="mt-32 pt-20 border-t border-border/20">
          <h2 className="font-display text-3xl mb-12 text-center">Diğer Deneyimler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherServices.slice(0, 4).map((s, i) => (
              <Link 
                key={s.id} 
                to="/hizmetler/$slug" 
                params={{ slug: s.id }}
                className="group flex flex-col gap-4 p-6 rounded-2xl bg-card/30 border border-border/40 hover:bg-card/60 hover:border-primary/30 transition-all animate-fade-up"
                style={{ animationDelay: `${i * 0.1 + 0.3}s` }}
              >
                <s.icon className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
