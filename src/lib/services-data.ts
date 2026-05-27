import heroImg from "@/assets/hero.jpg";
import h1Img from "@/assets/h1.jpg";
import c1Img from "@/assets/c1.jpg";
import d1Img from "@/assets/d1.jpg";
import s1Img from "@/assets/s1.jpg";
import { Coffee, Wine, ChefHat, Star, Wind } from "lucide-react";

export const servicesData = [
  {
    id: "premium-kahve",
    title: "Premium Kahve",
    description: "Dünyanın en iyi bölgelerinden özenle seçilmiş kahve çekirdekleri.",
    content: "Stella Lounge olarak kahveyi sadece bir içecek değil, bir sanat eseri olarak görüyoruz. Etiyopya'nın meyvemsi notalarından, Kolombiya'nın dengeli asiditesine kadar dünyanın en seçkin kahve çekirdeklerini özenle seçiyor, ustalıkla kavuruyor ve deneyimli baristalarımızın ellerinde mükemmel bir fincana dönüştürüyoruz. Özel demleme yöntemlerimizle kahvenin en saf halini keşfedin.",
    icon: Coffee,
    image: h1Img
  },
  {
    id: "imza-icecekler",
    title: "İmza İçecekler",
    description: "Uzman miksologlarımızın ellerinden çıkan eşsiz tatlar.",
    content: "Klasik tariflerin dışına çıkıyor, yaratıcılığımızı bardaklara taşıyoruz. Uzman miksologlarımız tarafından taze meyveler, özel şuruplar ve premium içeriklerle hazırlanan imza içeceklerimiz, size daha önce tatmadığınız eşsiz bir ferahlık ve lezzet deneyimi sunuyor. Her yudumda Stella Lounge'un farkını hissedeceksiniz.",
    icon: Wine,
    image: c1Img
  },
  {
    id: "gurme-lezzetler",
    title: "Gurme Lezzetler",
    description: "Günlük taze hazırlanan özel tatlılar ve atıştırmalıklar.",
    content: "İyi bir içeceğin en iyi eşlikçisi, ustalıkla hazırlanmış gurme lezzetlerdir. Şeflerimizin özenle seçtiği taze malzemelerle hazırladığı tatlılarımız, atıştırmalıklarımız ve dünya mutfağından seçme lezzetlerimiz, damak zevkinizi yeni ufuklara taşıyacak. Görselliğiyle göz dolduran, tadıyla iz bırakan menümüzü keşfedin.",
    icon: ChefHat,
    image: d1Img
  },
  {
    id: "luks-atmosfer",
    title: "Lüks Atmosfer",
    description: "Modern ve konforlu tasarımıyla kusursuz bir ortam.",
    content: "Stella Lounge, sadece lezzetleriyle değil, sunduğu atmosferle de şehrin en özel noktası. Modern ve şık mimarisi, rahatlatan aydınlatmaları, konforlu oturma alanları ve özenle seçilmiş müzikleriyle size günün yorgunluğunu unutturacak lüks bir kaçış noktası sunuyoruz. İster iş toplantılarınız, ister özel kutlamalarınız için kusursuz bir ortam.",
    icon: Star,
    image: heroImg
  },
  {
    id: "nargile",
    title: "Premium Nargile",
    description: "En kaliteli tütünler ve özel karışımlarla premium nargile keyfi.",
    content: "Geleneksel nargile keyfini modern ve premium bir yaklaşımla yeniden tanımlıyoruz. Dünyanın en kaliteli tütünleri, özel meyve karışımları ve profesyonel ekipmanlarımızla, size pürüzsüz ve uzun soluklu bir nargile deneyimi sunuyoruz. Uzman ekibimiz, damak zevkinize en uygun karışımı bulmanız için size rehberlik etmeye hazır.",
    icon: Wind,
    image: s1Img
  }
];

export const getServiceBySlug = (slug: string) => {
  return servicesData.find(service => service.id === slug);
};
