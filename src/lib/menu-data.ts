export type Item = {
  name: Record<string, string>;
  desc: Record<string, string>;
  price: string;
  img: string;
};

export type Category = {
  id: string;
  title: Record<string, string>;
  subtitle: Record<string, string>;
  cover_img?: string;
  items: Item[];
};

export const categories: Category[] = [
  {
    id: "snacks",
    title: { TR: "Atıştırmalıklar", BG: "Atıştırmalıklar", GR: "Atıştırmalıklar" },
    subtitle: { TR: "Paylaşmalık lezzetler", BG: "Paylaşmalık lezzetler", GR: "Paylaşmalık lezzetler" },
    items: [
      { name: { TR: "Kalem Böreği", BG: "Kalem Böreği", GR: "Kalem Böreği" }, desc: { TR: "Çıtır kalem böreği", BG: "Çıtır kalem böreği", GR: "Çıtır kalem böreği" }, price: "200 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/15c005bd-125e-4655-b1f2-972b31f82f82.jpg" },
      { name: { TR: "Soğan Halkası + Patates", BG: "Soğan Halkası + Patates", GR: "Soğan Halkası + Patates" }, desc: { TR: "Çıtır soğan halkaları ve patates kızartması", BG: "Çıtır soğan halkaları ve patates kızartması", GR: "Çıtır soğan halkaları ve patates kızartması" }, price: "200 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/b3a77228-69b5-4c56-9743-07319345111a.jpg" },
      { name: { TR: "Elma Dilim Cips", BG: "Elma Dilim Cips", GR: "Elma Dilim Cips" }, desc: { TR: "Baharatlı elma dilim patates", BG: "Baharatlı elma dilim patates", GR: "Baharatlı elma dilim patates" }, price: "225 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/95a70238-c84e-4867-b41f-1bf7668dea3f.jpg" },
      { name: { TR: "Patates Cips", BG: "Patates Cips", GR: "Patates Cips" }, desc: { TR: "İnce kesim çıtır patates", BG: "İnce kesim çıtır patates", GR: "İnce kesim çıtır patates" }, price: "200 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/204736d1-14d7-4e6b-ad60-294fe3619a0e.jpg" },
      { name: { TR: "Sosis Tabağı + Patates", BG: "Sosis Tabağı + Patates", GR: "Sosis Tabağı + Patates" }, desc: { TR: "Kızarmış sosis ve patates", BG: "Kızarmış sosis ve patates", GR: "Kızarmış sosis ve patates" }, price: "250 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/d011afe9-43ab-4dee-937e-ecb610767e86.jpg" },
      { name: { TR: "Stella Sepet", BG: "Stella Sepet", GR: "Stella Sepet" }, desc: { TR: "Özel karışım atıştırmalık sepeti", BG: "Özel karışım atıştırmalık sepeti", GR: "Özel karışım atıştırmalık sepeti" }, price: "300 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/ec37cd5b-7738-4cb7-9a80-52cee3fd84d1.jpg" },
      { name: { TR: "Gözleme", BG: "Gözleme", GR: "Gözleme" }, desc: { TR: "Geleneksel Türk gözlemesi", BG: "Geleneksel Türk gözlemesi", GR: "Geleneksel Türk gözlemesi" }, price: "250 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/1f4b71e0-202a-4063-905a-0319bfd5cc87.jpg" },
      { name: { TR: "Kumru + Patates", BG: "Kumru + Patates", GR: "Kumru + Patates" }, desc: { TR: "İzmir usulü kumru ve patates", BG: "İzmir usulü kumru ve patates", GR: "İzmir usulü kumru ve patates" }, price: "250 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/65d2d9f3-0845-4a82-89d5-30b9253a2869.jpg" },
      { name: { TR: "Patso", BG: "Patso", GR: "Patso" }, desc: { TR: "Bol patatesli sandviç", BG: "Bol patatesli sandviç", GR: "Bol patatesli sandviç" }, price: "200 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/b1b4ab59-cb05-4439-a871-30ecba6f849d.jpg" },
      { name: { TR: "Menemen", BG: "Menemen", GR: "Menemen" }, desc: { TR: "Taze domates ve biberli menemen", BG: "Taze domates ve biberli menemen", GR: "Taze domates ve biberli menemen" }, price: "250 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/6aaf5226-cb36-4370-ae58-9a410682df9f.jpg" },
      { name: { TR: "Kaşarlı Menemen", BG: "Kaşarlı Menemen", GR: "Kaşarlı Menemen" }, desc: { TR: "Bol kaşarlı sıcak menemen", BG: "Bol kaşarlı sıcak menemen", GR: "Bol kaşarlı sıcak menemen" }, price: "270 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/e7cb1978-df0b-468e-8c7e-1e0bc968d80f.jpg" },
      { name: { TR: "Sade Omlet", BG: "Sade Omlet", GR: "Sade Omlet" }, desc: { TR: "Klasik omlet", BG: "Klasik omlet", GR: "Klasik omlet" }, price: "200 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/0da7e720-8ed6-49a2-a53c-9cefd0559e19.jpg" },
      { name: { TR: "Kaşarlı Omlet", BG: "Kaşarlı Omlet", GR: "Kaşarlı Omlet" }, desc: { TR: "Eriyen kaşar peynirli omlet", BG: "Eriyen kaşar peynirli omlet", GR: "Eriyen kaşar peynirli omlet" }, price: "250 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/00fa7181-28fe-446c-94f2-a16e574bf9b9.jpg" },
      { name: { TR: "Kavurmalı Omlet", BG: "Kavurmalı Omlet", GR: "Kavurmalı Omlet" }, desc: { TR: "Özel kavurmalı doyurucu omlet", BG: "Özel kavurmalı doyurucu omlet", GR: "Özel kavurmalı doyurucu omlet" }, price: "350 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/fc8f9f62-4661-473b-a963-d0ddc6cca404.jpg" },
    ]
  },
  {
    id: "tostlar",
    title: { TR: "Tostlar", BG: "Tostlar", GR: "Tostlar" },
    subtitle: { TR: "Doyurucu tost çeşitleri", BG: "Doyurucu tost çeşitleri", GR: "Doyurucu tost çeşitleri" },
    items: [
      { name: { TR: "Kaşarlı Tost + Patates", BG: "Kaşarlı Tost + Patates", GR: "Kaşarlı Tost + Patates" }, desc: { TR: "Bol kaşarlı klasik tost", BG: "Bol kaşarlı klasik tost", GR: "Bol kaşarlı klasik tost" }, price: "200 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/b8987c82-ee22-4825-9268-3f28055c5b8f.jpg" },
      { name: { TR: "Sucuklu Tost + Patates", BG: "Sucuklu Tost + Patates", GR: "Sucuklu Tost + Patates" }, desc: { TR: "Baharatlı sucuklu tost", BG: "Baharatlı sucuklu tost", GR: "Baharatlı sucuklu tost" }, price: "225 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/18506be4-30b5-4aa7-809b-a59312636e46.jpg" },
      { name: { TR: "Karışık Tost + Patates", BG: "Karışık Tost + Patates", GR: "Karışık Tost + Patates" }, desc: { TR: "Sucuk ve kaşarın efsane uyumu", BG: "Sucuk ve kaşarın efsane uyumu", GR: "Sucuk ve kaşarın efsane uyumu" }, price: "250 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/73f2a6df-212b-476c-9482-4faac938de95.jpg" },
      { name: { TR: "Kavurmalı Kaşarlı Tost + Patates", BG: "Kavurmalı Kaşarlı Tost + Patates", GR: "Kavurmalı Kaşarlı Tost + Patates" }, desc: { TR: "Kavurma ve eriyen kaşar", BG: "Kavurma ve eriyen kaşar", GR: "Kavurma ve eriyen kaşar" }, price: "320 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/0e33e3ca-38cc-4824-abfe-288a2c468af4.jpg" },
      { name: { TR: "Beyaz Peynirli Domatesli Tost + Patates", BG: "Beyaz Peynirli Domatesli Tost + Patates", GR: "Beyaz Peynirli Domatesli Tost + Patates" }, desc: { TR: "Taze domates ve beyaz peynir", BG: "Taze domates ve beyaz peynir", GR: "Taze domates ve beyaz peynir" }, price: "225 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/4f0c5898-d06f-4e73-8141-2ad08965962c.jpg" },
      { name: { TR: "Üç Peynirli Tost + Patates", BG: "Üç Peynirli Tost + Patates", GR: "Üç Peynirli Tost + Patates" }, desc: { TR: "Özel üç peynir karışımı", BG: "Özel üç peynir karışımı", GR: "Özel üç peynir karışımı" }, price: "300 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/5ae3d72b-07b0-47fb-8692-59f093e2f2f0.jpg" },
    ]
  },
  {
    id: "hamburgerler",
    title: { TR: "Hamburgerler", BG: "Hamburgerler", GR: "Hamburgerler" },
    subtitle: { TR: "Ev yapımı köfteli burgerler", BG: "Ev yapımı köfteli burgerler", GR: "Ev yapımı köfteli burgerler" },
    items: [
      { name: { TR: "Stella Burger + Patates", BG: "Stella Burger + Patates", GR: "Stella Burger + Patates" }, desc: { TR: "Şefin özel tarifiyle Stella Burger", BG: "Şefin özel tarifiyle Stella Burger", GR: "Şefin özel tarifiyle Stella Burger" }, price: "300 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/350b9e11-8f88-4a4b-b70f-0d41b432efc2.jpg" },
      { name: { TR: "Cheese Burger + Patates", BG: "Cheese Burger + Patates", GR: "Cheese Burger + Patates" }, desc: { TR: "Çift kat cheddar peynirli", BG: "Çift kat cheddar peynirli", GR: "Çift kat cheddar peynirli" }, price: "325 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/ff4d1b0e-4ec6-43aa-871b-c8080f14d110.jpg" },
      { name: { TR: "Big Burger + Patates", BG: "Big Burger + Patates", GR: "Big Burger + Patates" }, desc: { TR: "Ekstra büyük ev yapımı köfte", BG: "Ekstra büyük ev yapımı köfte", GR: "Ekstra büyük ev yapımı köfte" }, price: "525 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/db5b283d-009f-4bc9-bd47-2544d3f5d6ba.jpg" },
      { name: { TR: "Chicken Burger + Patates", BG: "Chicken Burger + Patates", GR: "Chicken Burger + Patates" }, desc: { TR: "Çıtır tavuk göğsü", BG: "Çıtır tavuk göğsü", GR: "Çıtır tavuk göğsü" }, price: "250 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/b64d5e7d-908f-4fe8-92a4-81759cd5a982.jpg" },
      { name: { TR: "Izgara Tavuk Burger + Patates", BG: "Izgara Tavuk Burger + Patates", GR: "Izgara Tavuk Burger + Patates" }, desc: { TR: "Sağlıklı ızgara tavuk burger", BG: "Sağlıklı ızgara tavuk burger", GR: "Sağlıklı ızgara tavuk burger" }, price: "275 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/63a77e1f-5b90-4ba2-875b-610ae286f68c.jpg" },
      { name: { TR: "Smash Burger + Patates", BG: "Smash Burger + Patates", GR: "Smash Burger + Patates" }, desc: { TR: "Karidelenmiş ezme köfte", BG: "Karidelenmiş ezme köfte", GR: "Karidelenmiş ezme köfte" }, price: "400 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/fdd12f05-d044-4008-9a3b-38e7db424bc1.jpg" },
    ]
  },
  {
    id: "makarnalar",
    title: { TR: "Makarnalar", BG: "Makarnalar", GR: "Makarnalar" },
    subtitle: { TR: "İtalyan esintisi", BG: "İtalyan esintisi", GR: "İtalyan esintisi" },
    items: [
      { name: { TR: "Spagetti Napoliten", BG: "Spagetti Napoliten", GR: "Spagetti Napoliten" }, desc: { TR: "Taze fesleğenli domates soslu", BG: "Taze fesleğenli domates soslu", GR: "Taze fesleğenli domates soslu" }, price: "325 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/89ca050f-fc69-4622-b148-cb8ef31fc772.jpg" },
      { name: { TR: "Noodle", BG: "Noodle", GR: "Noodle" }, desc: { TR: "Asya usulü sebzeli noodle", BG: "Asya usulü sebzeli noodle", GR: "Asya usulü sebzeli noodle" }, price: "380 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/dd0947c8-3f50-4299-84ff-21ebf046eed5.jpg" },
      { name: { TR: "Penne Arrabbiata", BG: "Penne Arrabbiata", GR: "Penne Arrabbiata" }, desc: { TR: "Acılı domates soslu penne", BG: "Acılı domates soslu penne", GR: "Acılı domates soslu penne" }, price: "325 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/973808e8-e748-4137-bedc-9cdba85ffa81.jpg" },
      { name: { TR: "Penne Elenora Tavuklu", BG: "Penne Elenora Tavuklu", GR: "Penne Elenora Tavuklu" }, desc: { TR: "Özel soslu tavuklu penne", BG: "Özel soslu tavuklu penne", GR: "Özel soslu tavuklu penne" }, price: "380 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/44e405d6-051e-4c92-8fb2-cc74d06cfa73.jpg" },
      { name: { TR: "Fettuccine Alfredo", BG: "Fettuccine Alfredo", GR: "Fettuccine Alfredo" }, desc: { TR: "Krema, mantar ve parmesan", BG: "Krema, mantar ve parmesan", GR: "Krema, mantar ve parmesan" }, price: "380 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/b2b3cb18-4a40-40ab-9095-532b8226211d.jpg" },
    ]
  },
  {
    id: "salads",
    title: { TR: "Salatalar", BG: "Salatalar", GR: "Salatalar" },
    subtitle: { TR: "Taze ve sağlıklı seçenekler", BG: "Taze ve sağlıklı seçenekler", GR: "Taze ve sağlıklı seçenekler" },
    items: [
      { name: { TR: "Akdeniz Salata", BG: "Akdeniz Salata", GR: "Akdeniz Salata" }, desc: { TR: "Zeytin ve beyaz peynirli", BG: "Zeytin ve beyaz peynirli", GR: "Zeytin ve beyaz peynirli" }, price: "250 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/e7599e7e-1a15-49eb-b0f7-79b7dbd4f871.jpg" },
      { name: { TR: "Sezar Salata", BG: "Sezar Salata", GR: "Sezar Salata" }, desc: { TR: "Tavuklu klasik sezar", BG: "Tavuklu klasik sezar", GR: "Tavuklu klasik sezar" }, price: "350 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/06afc340-29a3-4384-a673-78c5bceb8f24.jpg" },
      { name: { TR: "Kajun Salata", BG: "Kajun Salata", GR: "Kajun Salata" }, desc: { TR: "Kajun baharatlı çıtır tavuklu", BG: "Kajun baharatlı çıtır tavuklu", GR: "Kajun baharatlı çıtır tavuklu" }, price: "350 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/d9a8a7b4-c169-486d-88a6-aa5bebae1ba5.jpg" },
      { name: { TR: "Ton Balıklı Salata", BG: "Ton Balıklı Salata", GR: "Ton Balıklı Salata" }, desc: { TR: "Bol malzemeli ton balıklı", BG: "Bol malzemeli ton balıklı", GR: "Bol malzemeli ton balıklı" }, price: "350 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/09004869-c5a6-499d-b229-30645593044e.jpg" },
      { name: { TR: "Antrikot Salata", BG: "Antrikot Salata", GR: "Antrikot Salata" }, desc: { TR: "Lüks dilim antrikot ile", BG: "Lüks dilim antrikot ile", GR: "Lüks dilim antrikot ile" }, price: "500 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/a33180e6-fb19-4fcf-9a06-76e5cefb42e2.jpg" },
    ]
  },
  {
    id: "pizzalar",
    title: { TR: "Pizzalar", BG: "Pizzalar", GR: "Pizzalar" },
    subtitle: { TR: "Taş fırın lezzeti", BG: "Taş fırın lezzeti", GR: "Taş fırın lezzeti" },
    items: [
      { name: { TR: "Margherita Pizza", BG: "Margherita Pizza", GR: "Margherita Pizza" }, desc: { TR: "Küçük / Orta / Büyük boy seçenekli", BG: "Küçük / Orta / Büyük boy seçenekli", GR: "Küçük / Orta / Büyük boy seçenekli" }, price: "275/325/375 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/4c8d14b4-1487-4ed0-beea-800e6397e5d9.jpg" },
      { name: { TR: "Benmari Pizza", BG: "Benmari Pizza", GR: "Benmari Pizza" }, desc: { TR: "Küçük / Orta / Büyük boy seçenekli", BG: "Küçük / Orta / Büyük boy seçenekli", GR: "Küçük / Orta / Büyük boy seçenekli" }, price: "275/325/375 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/d43ad755-7fc7-4072-af8c-83e65444fe53.jpg" },
      { name: { TR: "Vegetarian Pizza", BG: "Vegetarian Pizza", GR: "Vegetarian Pizza" }, desc: { TR: "Küçük / Orta / Büyük boy seçenekli", BG: "Küçük / Orta / Büyük boy seçenekli", GR: "Küçük / Orta / Büyük boy seçenekli" }, price: "275/325/375 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/490c3320-b3ed-4bca-9911-9e0c7353d50f.jpg" },
      { name: { TR: "Condoleeza Pizza", BG: "Condoleeza Pizza", GR: "Condoleeza Pizza" }, desc: { TR: "Küçük / Orta / Büyük boy seçenekli", BG: "Küçük / Orta / Büyük boy seçenekli", GR: "Küçük / Orta / Büyük boy seçenekli" }, price: "300/350/400 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/5e76c70e-cd34-45f4-b1c5-9989efb3859d.jpg" },
      { name: { TR: "Napoliten Pizza", BG: "Napoliten Pizza", GR: "Napoliten Pizza" }, desc: { TR: "Küçük / Orta / Büyük boy seçenekli", BG: "Küçük / Orta / Büyük boy seçenekli", GR: "Küçük / Orta / Büyük boy seçenekli" }, price: "300/350/400 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/014fda2c-eea4-41e7-8011-1771ffe154de.jpg" },
      { name: { TR: "İtaliano Pizza", BG: "İtaliano Pizza", GR: "İtaliano Pizza" }, desc: { TR: "Küçük / Orta / Büyük boy seçenekli", BG: "Küçük / Orta / Büyük boy seçenekli", GR: "Küçük / Orta / Büyük boy seçenekli" }, price: "375/450/525 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/25c8c368-e788-4d5a-95e0-d81222ec5aa7.jpg" },
      { name: { TR: "Romano Pizza", BG: "Romano Pizza", GR: "Romano Pizza" }, desc: { TR: "Küçük / Orta / Büyük boy seçenekli", BG: "Küçük / Orta / Büyük boy seçenekli", GR: "Küçük / Orta / Büyük boy seçenekli" }, price: "375/450/525 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/1b153885-baea-4fd9-a804-6387f42549c6.jpg" },
      { name: { TR: "Stella Gurme Pizza", BG: "Stella Gurme Pizza", GR: "Stella Gurme Pizza" }, desc: { TR: "Küçük / Orta / Büyük boy seçenekli", BG: "Küçük / Orta / Büyük boy seçenekli", GR: "Küçük / Orta / Büyük boy seçenekli" }, price: "375/450/525 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/aa407d93-d88e-49b2-9904-06325a8f93c0.jpg" },
    ]
  },
  {
    id: "tavuk_lezzetleri",
    title: { TR: "Tavuk Lezzetleri", BG: "Tavuk Lezzetleri", GR: "Tavuk Lezzetleri" },
    subtitle: { TR: "Özel soslu tavuk seçenekleri", BG: "Özel soslu tavuk seçenekleri", GR: "Özel soslu tavuk seçenekleri" },
    items: [
      { name: { TR: "Köri Soslu Tavuk", BG: "Köri Soslu Tavuk", GR: "Köri Soslu Tavuk" }, desc: { TR: "Özel Hint köri sosuyla", BG: "Özel Hint köri sosuyla", GR: "Özel Hint köri sosuyla" }, price: "350 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/8678fddd-4251-4b1f-97ae-04e71de092df.jpg" },
      { name: { TR: "Barbekü Soslu Tavuk", BG: "Barbekü Soslu Tavuk", GR: "Barbekü Soslu Tavuk" }, desc: { TR: "Tütsülenmiş barbekü soslu", BG: "Tütsülenmiş barbekü soslu", GR: "Tütsülenmiş barbekü soslu" }, price: "350 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/1550f837-d0ee-45bd-8683-04cd2a056db0.jpg" },
      { name: { TR: "Meksika Soslu Tavuk", BG: "Meksika Soslu Tavuk", GR: "Meksika Soslu Tavuk" }, desc: { TR: "Acı ve tatlı soslu tavuk", BG: "Acı ve tatlı soslu tavuk", GR: "Acı ve tatlı soslu tavuk" }, price: "350 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/4049642d-8c5d-447e-b84e-14f9cf0e1d2d.jpg" },
      { name: { TR: "Chili Soslu Tavuk", BG: "Chili Soslu Tavuk", GR: "Chili Soslu Tavuk" }, desc: { TR: "Tatlı acı chili soslu", BG: "Tatlı acı chili soslu", GR: "Tatlı acı chili soslu" }, price: "350 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/53aca464-9c19-4a0c-b37a-5c48f64b06f0.jpg" },
      { name: { TR: "Dağ Kekikli Tavuk", BG: "Dağ Kekikli Tavuk", GR: "Dağ Kekikli Tavuk" }, desc: { TR: "Taze kekik aromalı", BG: "Taze kekik aromalı", GR: "Taze kekik aromalı" }, price: "350 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/0c1a71f6-aa51-4c5d-8e6e-187de8c327b4.jpg" },
      { name: { TR: "Püre Yatağında Tavuk", BG: "Püre Yatağında Tavuk", GR: "Püre Yatağında Tavuk" }, desc: { TR: "Kremalı püre eşliğinde", BG: "Kremalı püre eşliğinde", GR: "Kremalı püre eşliğinde" }, price: "350 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/451a1ae2-0660-4113-b0d6-344ee8af0c83.jpg" },
      { name: { TR: "Tavuk Çöp Şiş", BG: "Tavuk Çöp Şiş", GR: "Tavuk Çöp Şiş" }, desc: { TR: "Marine edilmiş şiş tavuk", BG: "Marine edilmiş şiş tavuk", GR: "Marine edilmiş şiş tavuk" }, price: "350 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/4d5cd994-0a7b-4a86-b662-323b2fae2878.jpg" },
      { name: { TR: "Stella Gurme Tavuk", BG: "Stella Gurme Tavuk", GR: "Stella Gurme Tavuk" }, desc: { TR: "Şefin özel tavuk tarifi", BG: "Şefin özel tavuk tarifi", GR: "Şefin özel tavuk tarifi" }, price: "375 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/7eb39df9-9279-4f8c-b881-0a973d6e51bd.jpg" },
    ]
  },
  {
    id: "etler_izgaralar",
    title: { TR: "Etler ve Izgaralar", BG: "Etler ve Izgaralar", GR: "Etler ve Izgaralar" },
    subtitle: { TR: "Mangal ve ızgara lezzetleri", BG: "Mangal ve ızgara lezzetleri", GR: "Mangal ve ızgara lezzetleri" },
    items: [
      { name: { TR: "Barbekü Soslu Dana", BG: "Barbekü Soslu Dana", GR: "Barbekü Soslu Dana" }, desc: { TR: "Yumuşacık dana eti, barbekü soslu", BG: "Yumuşacık dana eti, barbekü soslu", GR: "Yumuşacık dana eti, barbekü soslu" }, price: "600 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/5e33dcfb-d640-4b2f-8a80-a110a0347343.jpg" },
      { name: { TR: "Meksika Soslu Dana", BG: "Meksika Soslu Dana", GR: "Meksika Soslu Dana" }, desc: { TR: "Meksika soslu dana sote", BG: "Meksika soslu dana sote", GR: "Meksika soslu dana sote" }, price: "600 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/eb6260a3-4c13-4108-b51d-18332d97908f.jpg" },
      { name: { TR: "Mantar Soslu Dana", BG: "Mantar Soslu Dana", GR: "Mantar Soslu Dana" }, desc: { TR: "Kremalı mantar soslu dana eti", BG: "Kremalı mantar soslu dana eti", GR: "Kremalı mantar soslu dana eti" }, price: "600 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/e718ba73-b0b3-4e1f-adc1-813a53fa1209.jpg" },
      { name: { TR: "Dana Izgara", BG: "Dana Izgara", GR: "Dana Izgara" }, desc: { TR: "Saf dana ızgara lokum", BG: "Saf dana ızgara lokum", GR: "Saf dana ızgara lokum" }, price: "600 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/be902a8d-dd63-49db-b8c2-45059891f9c6.jpg" },
      { name: { TR: "Izgara Köfte", BG: "Izgara Köfte", GR: "Izgara Köfte" }, desc: { TR: "Ev yapımı anne köftesi", BG: "Ev yapımı anne köftesi", GR: "Ev yapımı anne köftesi" }, price: "450 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/5e78f7e4-892d-4b95-8b6c-2d503928038f.jpg" },
    ]
  },
  {
    id: "desserts",
    title: { TR: "Tatlılar", BG: "Tatlılar", GR: "Tatlılar" },
    subtitle: { TR: "İmza tatlılarımız", BG: "İmza tatlılarımız", GR: "İmza tatlılarımız" },
    items: [
      { name: { TR: "Magnolya", BG: "Magnolya", GR: "Magnolya" }, desc: { TR: "Çilekli ev yapımı magnolya", BG: "Çilekli ev yapımı magnolya", GR: "Çilekli ev yapımı magnolya" }, price: "200 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/e5d60866-daec-471f-be7e-987018685301.jpg" },
      { name: { TR: "Stella Cup", BG: "Stella Cup", GR: "Stella Cup" }, desc: { TR: "Özel şef kupası", BG: "Özel şef kupası", GR: "Özel şef kupası" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=400&q=80" },
      { name: { TR: "Sufle", BG: "Sufle", GR: "Sufle" }, desc: { TR: "Akışkan çikolatalı sıcak sufle", BG: "Akışkan çikolatalı sıcak sufle", GR: "Akışkan çikolatalı sıcak sufle" }, price: "250 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/99f59b31-5dbf-44f4-a5bc-9af12c788354.jpg" },
      { name: { TR: "Frambuazlı Cheesecake", BG: "Frambuazlı Cheesecake", GR: "Frambuazlı Cheesecake" }, desc: { TR: "Taze frambuaz soslu", BG: "Taze frambuaz soslu", GR: "Taze frambuaz soslu" }, price: "200 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/e8ea022a-28c6-4d97-a8de-9ad0d7020927.jpg" },
      { name: { TR: "Limonlu Cheesecake", BG: "Limonlu Cheesecake", GR: "Limonlu Cheesecake" }, desc: { TR: "Ferahlatıcı limonlu", BG: "Ferahlatıcı limonlu", GR: "Ferahlatıcı limonlu" }, price: "200 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/8872257b-d04d-4857-a5b5-dd2088996163.jpg" },
      { name: { TR: "Tiramisu", BG: "Tiramisu", GR: "Tiramisu" }, desc: { TR: "Orijinal İtalyan tiramisu", BG: "Orijinal İtalyan tiramisu", GR: "Orijinal İtalyan tiramisu" }, price: "200 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/14ba20d9-d24a-4839-b9fd-3669d55aa543.jpg" },
      { name: { TR: "Devil's", BG: "Devil's", GR: "Devil's" }, desc: { TR: "Yoğun çikolatalı ıslak kek", BG: "Yoğun çikolatalı ıslak kek", GR: "Yoğun çikolatalı ıslak kek" }, price: "300 ₺", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80" },
      { name: { TR: "Waffle", BG: "Waffle", GR: "Waffle" }, desc: { TR: "Bol meyveli Belçika waffle", BG: "Bol meyveli Belçika waffle", GR: "Bol meyveli Belçika waffle" }, price: "300 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/7d48689d-289e-4936-b84a-d454cd08115b.jpg" },
      { name: { TR: "Waffle Salata Kase", BG: "Waffle Salata Kase", GR: "Waffle Salata Kase" }, desc: { TR: "Meyve şöleni waffle kasesinde", BG: "Meyve şöleni waffle kasesinde", GR: "Meyve şöleni waffle kasesinde" }, price: "300 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/1e853de3-f0fa-43cb-83f8-06d45bed0d9f.jpg" },
      { name: { TR: "Dondurma Porsiyon", BG: "Dondurma Porsiyon", GR: "Dondurma Porsiyon" }, desc: { TR: "3 top dondurma porsiyonu", BG: "3 top dondurma porsiyonu", GR: "3 top dondurma porsiyonu" }, price: "200 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/b1a1822b-8bf6-4f16-8b7f-2d41ddeda461.jpg" },
      { name: { TR: "Dondurma (1 Top)", BG: "Dondurma (1 Top)", GR: "Dondurma (1 Top)" }, desc: { TR: "Seçmeli tek top", BG: "Seçmeli tek top", GR: "Seçmeli tek top" }, price: "40 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/95b451a4-822a-45d0-9fe8-26a35c6f30a1.jpg" },
      { name: { TR: "San Sebastian", BG: "San Sebastian", GR: "San Sebastian" }, desc: { TR: "Karamelize San Sebastian", BG: "Karamelize San Sebastian", GR: "Karamelize San Sebastian" }, price: "250 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/ad5b5e3d-86e5-4a51-b3e3-35fda71ee867.jpg" },
    ]
  },
  {
    id: "corbalar",
    title: { TR: "Çorbalar", BG: "Çorbalar", GR: "Çorbalar" },
    subtitle: { TR: "Sıcacık bir başlangıç", BG: "Sıcacık bir başlangıç", GR: "Sıcacık bir başlangıç" },
    items: [
      { name: { TR: "Tavuk Suyu Çorbası", BG: "Tavuk Suyu Çorbası", GR: "Tavuk Suyu Çorbası" }, desc: { TR: "Şifa kaynağı tavuk suyu çorbası", BG: "Şifa kaynağı tavuk suyu çorbası", GR: "Şifa kaynağı tavuk suyu çorbası" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/988dcc62-12b5-4b71-ac15-8c2f0edefda6.jpg" },
      { name: { TR: "Mercimek Çorbası", BG: "Mercimek Çorbası", GR: "Mercimek Çorbası" }, desc: { TR: "Süzme mercimek", BG: "Süzme mercimek", GR: "Süzme mercimek" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/9d1227f1-96f3-4ee6-8daa-1055b41a2107.jpg" },
    ]
  },
  {
    id: "kahvalti",
    title: { TR: "Kahvaltı", BG: "Kahvaltı", GR: "Kahvaltı" },
    subtitle: { TR: "Güne güzel bir başlangıç", BG: "Güne güzel bir başlangıç", GR: "Güne güzel bir başlangıç" },
    items: [
      { name: { TR: "Serpme Kahvaltı", BG: "Serpme Kahvaltı", GR: "Serpme Kahvaltı" }, desc: { TR: "Beyaz Peynir, Eski Kaşar, Süzme Peynir, Krem Peynir, Ekşimikli Biber, Özel Kahvaltı Sosu, Salam, Yeşil/Siyah Zeytin, Domates, Salatalık, Yeşillik, Tereyağı, Bal, Reçel, Nutella, Patates Cips, Sucuk, Yumurta, Pankek, Sıcak Börek Tabağı, Çay, Türk Kahvesi", BG: "Beyaz Peynir, Eski Kaşar, Süzme Peynir, Krem Peynir, Ekşimikli Biber, Özel Kahvaltı Sosu, Salam, Yeşil/Siyah Zeytin, Domates, Salatalık, Yeşillik, Tereyağı, Bal, Reçel, Nutella, Patates Cips, Sucuk, Yumurta, Pankek, Sıcak Börek Tabağı, Çay, Türk Kahvesi", GR: "Beyaz Peynir, Eski Kaşar, Süzme Peynir, Krem Peynir, Ekşimikli Biber, Özel Kahvaltı Sosu, Salam, Yeşil/Siyah Zeytin, Domates, Salatalık, Yeşillik, Tereyağı, Bal, Reçel, Nutella, Patates Cips, Sucuk, Yumurta, Pankek, Sıcak Börek Tabağı, Çay, Türk Kahvesi" }, price: "500 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/cce22209-7cc2-44e0-8375-42f5356c9b22.jpg" },
    ]
  },
  {
    id: "hot_drinks",
    title: { TR: "Sıcak İçecekler", BG: "Sıcak İçecekler", GR: "Sıcak İçecekler" },
    subtitle: { TR: "İçinizi ısıtacak çay ve kahveler", BG: "İçinizi ısıtacak çay ve kahveler", GR: "İçinizi ısıtacak çay ve kahveler" },
    items: [
      { name: { TR: "Çay", BG: "Çay", GR: "Çay" }, desc: { TR: "İnce belli bardakta", BG: "İnce belli bardakta", GR: "İnce belli bardakta" }, price: "25 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/3f88ef19-7625-4667-a497-3b638ee8e544.jpg" },
      { name: { TR: "Fincan Çay", BG: "Fincan Çay", GR: "Fincan Çay" }, desc: { TR: "Büyük fincan", BG: "Büyük fincan", GR: "Büyük fincan" }, price: "40 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/35db174a-ba63-4090-a1ff-acf0cc406c45.jpg" },
      { name: { TR: "Fincan Oralet Çayları", BG: "Fincan Oralet Çayları", GR: "Fincan Oralet Çayları" }, desc: { TR: "Çeşitli meyve aromalı", BG: "Çeşitli meyve aromalı", GR: "Çeşitli meyve aromalı" }, price: "50 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/75a31551-7962-4a24-814c-58c2f0cbef36.jpg" },
      { name: { TR: "Bardak Oralet Çayları", BG: "Bardak Oralet Çayları", GR: "Bardak Oralet Çayları" }, desc: { TR: "İnce belli bardakta oralet", BG: "İnce belli bardakta oralet", GR: "İnce belli bardakta oralet" }, price: "35 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/886c3c2b-e039-44f7-bef6-2f1bb14f964e.jpg" },
      { name: { TR: "Bitki Çayları", BG: "Bitki Çayları", GR: "Bitki Çayları" }, desc: { TR: "Doğal bitki çayları", BG: "Doğal bitki çayları", GR: "Doğal bitki çayları" }, price: "140 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/1b5aac67-5739-4068-8fef-13f9c8b282b4.jpg" },
      { name: { TR: "Süt", BG: "Süt", GR: "Süt" }, desc: { TR: "Sıcak süt", BG: "Sıcak süt", GR: "Sıcak süt" }, price: "100 ₺", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80" },
      { name: { TR: "Salep", BG: "Salep", GR: "Salep" }, desc: { TR: "Tarçınlı sıcak salep", BG: "Tarçınlı sıcak salep", GR: "Tarçınlı sıcak salep" }, price: "140 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/3a8e9c89-e01f-403f-b955-4fd44fab8450.jpg" },
      { name: { TR: "Damla Sakızlı Salep", BG: "Damla Sakızlı Salep", GR: "Damla Sakızlı Salep" }, desc: { TR: "Özel damla sakızlı salep", BG: "Özel damla sakızlı salep", GR: "Özel damla sakızlı salep" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/541eda3c-1987-4f71-9903-2195fcdd13b8.jpg" },
      { name: { TR: "Nescafe Sade", BG: "Nescafe Sade", GR: "Nescafe Sade" }, desc: { TR: "Sıcak granül kahve", BG: "Sıcak granül kahve", GR: "Sıcak granül kahve" }, price: "130 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/bcdf2cba-1a78-4f16-b9cf-0686f61abc8d.jpg" },
      { name: { TR: "Sütlü Nescafe", BG: "Sütlü Nescafe", GR: "Sütlü Nescafe" }, desc: { TR: "Sütlü granül kahve", BG: "Sütlü granül kahve", GR: "Sütlü granül kahve" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/93abd039-6766-4be7-920f-a296b4dd105d.jpg" },
    ]
  },
  {
    id: "turkish_coffee",
    title: { TR: "Kumda Türk Kahveleri", BG: "Kumda Türk Kahveleri", GR: "Kumda Türk Kahveleri" },
    subtitle: { TR: "Geleneksel kumda pişirim", BG: "Geleneksel kumda pişirim", GR: "Geleneksel kumda pişirim" },
    items: [
      { name: { TR: "Türk Kahvesi", BG: "Türk Kahvesi", GR: "Türk Kahvesi" }, desc: { TR: "Klasik kumda Türk kahvesi", BG: "Klasik kumda Türk kahvesi", GR: "Klasik kumda Türk kahvesi" }, price: "70 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/5a98e6f0-0f93-47c6-8088-e4a98d1e55a1.jpg" },
      { name: { TR: "Double Türk Kahvesi", BG: "Double Türk Kahvesi", GR: "Double Türk Kahvesi" }, desc: { TR: "Duble porsiyon", BG: "Duble porsiyon", GR: "Duble porsiyon" }, price: "120 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/9905779b-66f9-4e92-b995-d7fb97754b97.jpg" },
      { name: { TR: "Sütlü Türk Kahvesi", BG: "Sütlü Türk Kahvesi", GR: "Sütlü Türk Kahvesi" }, desc: { TR: "Yumuşak içimli sütlü kahve", BG: "Yumuşak içimli sütlü kahve", GR: "Yumuşak içimli sütlü kahve" }, price: "80 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/3c787125-d29f-4256-b69b-11d0be586052.jpg" },
      { name: { TR: "Double Sütlü Türk Kahvesi", BG: "Double Sütlü Türk Kahvesi", GR: "Double Sütlü Türk Kahvesi" }, desc: { TR: "Duble sütlü Türk kahvesi", BG: "Duble sütlü Türk kahvesi", GR: "Duble sütlü Türk kahvesi" }, price: "130 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/02110c02-9046-49c1-ae84-cb3a742a216b.jpg" },
      { name: { TR: "Damla Sakızlı Türk Kahvesi", BG: "Damla Sakızlı Türk Kahvesi", GR: "Damla Sakızlı Türk Kahvesi" }, desc: { TR: "Ege damla sakızlı", BG: "Ege damla sakızlı", GR: "Ege damla sakızlı" }, price: "80 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/a9b1c85f-97a0-40dc-8d28-ff4ef1710383.jpg" },
      { name: { TR: "Menengiç Türk Kahvesi", BG: "Menengiç Türk Kahvesi", GR: "Menengiç Türk Kahvesi" }, desc: { TR: "Güneydoğu menengiç kahvesi", BG: "Güneydoğu menengiç kahvesi", GR: "Güneydoğu menengiç kahvesi" }, price: "80 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/ee1cb847-c055-43bb-a953-42570e46de4d.jpg" },
      { name: { TR: "Dibek Kahvesi", BG: "Dibek Kahvesi", GR: "Dibek Kahvesi" }, desc: { TR: "Geleneksel dibek kahvesi", BG: "Geleneksel dibek kahvesi", GR: "Geleneksel dibek kahvesi" }, price: "80 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/0638d855-2ddd-4b5c-acfb-b2b5b13e20a2.jpg" },
    ]
  },
  {
    id: "espresso",
    title: { TR: "Espresso Bazlı Kahveler", BG: "Espresso Bazlı Kahveler", GR: "Espresso Bazlı Kahveler" },
    subtitle: { TR: "Dünya kahveleri", BG: "Dünya kahveleri", GR: "Dünya kahveleri" },
    items: [
      { name: { TR: "Espresso", BG: "Espresso", GR: "Espresso" }, desc: { TR: "Tek shot espresso", BG: "Tek shot espresso", GR: "Tek shot espresso" }, price: "80 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/7ba60d15-b944-49e4-a658-e94f2ad0e3f6.jpg" },
      { name: { TR: "Double Espresso", BG: "Double Espresso", GR: "Double Espresso" }, desc: { TR: "Çift shot espresso", BG: "Çift shot espresso", GR: "Çift shot espresso" }, price: "120 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/33a772b1-8b48-4e7d-82ee-86efab291472.jpg" },
      { name: { TR: "Matcha Latte", BG: "Matcha Latte", GR: "Matcha Latte" }, desc: { TR: "Sıcak matcha yeşil çay latte", BG: "Sıcak matcha yeşil çay latte", GR: "Sıcak matcha yeşil çay latte" }, price: "200 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/283ef45f-a91d-4017-b123-1655425d3a97.jpg" },
      { name: { TR: "Americano", BG: "Americano", GR: "Americano" }, desc: { TR: "Sıcak su ile inceltilmiş espresso", BG: "Sıcak su ile inceltilmiş espresso", GR: "Sıcak su ile inceltilmiş espresso" }, price: "120 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/7a48be7d-1dcc-473c-b02e-734272c17ebc.jpg" },
      { name: { TR: "Cappuccino", BG: "Cappuccino", GR: "Cappuccino" }, desc: { TR: "Bol süt köpüklü espresso", BG: "Bol süt köpüklü espresso", GR: "Bol süt köpüklü espresso" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/6960c785-0320-40a5-867f-d61517f234e3.jpg" },
      { name: { TR: "Coffee Latte", BG: "Coffee Latte", GR: "Coffee Latte" }, desc: { TR: "Sıcak sütlü hafif espresso", BG: "Sıcak sütlü hafif espresso", GR: "Sıcak sütlü hafif espresso" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/40a8d173-f25c-4522-91ce-87eaf2ee52a1.jpg" },
      { name: { TR: "Coffee Mocha", BG: "Coffee Mocha", GR: "Coffee Mocha" }, desc: { TR: "Çikolatalı espresso ve süt", BG: "Çikolatalı espresso ve süt", GR: "Çikolatalı espresso ve süt" }, price: "160 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/2debe347-bf66-4e49-9f6b-f989ca2d523f.jpg" },
      { name: { TR: "White Chocolate Mocha", BG: "White Chocolate Mocha", GR: "White Chocolate Mocha" }, desc: { TR: "Beyaz çikolatalı espresso ve süt", BG: "Beyaz çikolatalı espresso ve süt", GR: "Beyaz çikolatalı espresso ve süt" }, price: "160 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/42c59260-0551-44ee-a94f-84cf919fb7c6.jpg" },
      { name: { TR: "Latte Macchiato", BG: "Latte Macchiato", GR: "Latte Macchiato" }, desc: { TR: "Katmanlı latte", BG: "Katmanlı latte", GR: "Katmanlı latte" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/06add439-1fd6-432a-a9d7-a32a1bc24352.jpg" },
      { name: { TR: "Caramel Latte Macchiato", BG: "Caramel Latte Macchiato", GR: "Caramel Latte Macchiato" }, desc: { TR: "Karamel şuruplu latte macchiato", BG: "Karamel şuruplu latte macchiato", GR: "Karamel şuruplu latte macchiato" }, price: "160 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/308c60ef-a900-42cf-a3f3-ce4093108daf.jpg" },
      { name: { TR: "Affogato", BG: "Affogato", GR: "Affogato" }, desc: { TR: "Vanilyalı dondurma üzerine espresso", BG: "Vanilyalı dondurma üzerine espresso", GR: "Vanilyalı dondurma üzerine espresso" }, price: "180 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/7dc2a627-ad49-4e18-afb5-98af63ad5abf.jpg" },
      { name: { TR: "Filtre Kahve", BG: "Filtre Kahve", GR: "Filtre Kahve" }, desc: { TR: "Taze demlenmiş filtre kahve", BG: "Taze demlenmiş filtre kahve", GR: "Taze demlenmiş filtre kahve" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/3f5a69b8-c969-4d3b-a627-1c441345244b.jpg" },
    ]
  },
  {
    id: "hot_choco",
    title: { TR: "Sıcak Çikolatalar", BG: "Sıcak Çikolatalar", GR: "Sıcak Çikolatalar" },
    subtitle: { TR: "Kış aylarının vazgeçilmezi", BG: "Kış aylarının vazgeçilmezi", GR: "Kış aylarının vazgeçilmezi" },
    items: [
      { name: { TR: "Sıcak Çikolata", BG: "Sıcak Çikolata", GR: "Sıcak Çikolata" }, desc: { TR: "Klasik yoğun sıcak çikolata", BG: "Klasik yoğun sıcak çikolata", GR: "Klasik yoğun sıcak çikolata" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/7b898c09-c94f-4663-8c54-de31ca13b19d.jpg" },
      { name: { TR: "Beyaz Sıcak Çikolata", BG: "Beyaz Sıcak Çikolata", GR: "Beyaz Sıcak Çikolata" }, desc: { TR: "Tatlı beyaz çikolata", BG: "Tatlı beyaz çikolata", GR: "Tatlı beyaz çikolata" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/43839a39-2b64-45ef-bacc-9ee0a4376ab2.jpg" },
      { name: { TR: "Çilekli Sıcak Çikolata", BG: "Çilekli Sıcak Çikolata", GR: "Çilekli Sıcak Çikolata" }, desc: { TR: "Çilek aromalı", BG: "Çilek aromalı", GR: "Çilek aromalı" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/295a399c-7edc-478a-a164-af6ec0bdf810.jpg" },
      { name: { TR: "Fındıklı Sıcak Çikolata", BG: "Fındıklı Sıcak Çikolata", GR: "Fındıklı Sıcak Çikolata" }, desc: { TR: "Fındık aromalı", BG: "Fındık aromalı", GR: "Fındık aromalı" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/3de9a8c2-8e75-42b6-88d1-e8192c469f58.jpg" },
      { name: { TR: "Karamelli Sıcak Çikolata", BG: "Karamelli Sıcak Çikolata", GR: "Karamelli Sıcak Çikolata" }, desc: { TR: "Karamel aromalı", BG: "Karamel aromalı", GR: "Karamel aromalı" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/0a050dc7-090d-4e95-9022-10a4067181e9.jpg" },
      { name: { TR: "Muzlu Sıcak Çikolata", BG: "Muzlu Sıcak Çikolata", GR: "Muzlu Sıcak Çikolata" }, desc: { TR: "Muz aromalı sıcak çikolata", BG: "Muz aromalı sıcak çikolata", GR: "Muz aromalı sıcak çikolata" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/060ad071-0cdc-496a-9441-0de495a8e6b4.jpg" },
    ]
  },
  {
    id: "cold_coffee",
    title: { TR: "Soğuk Kahveler", BG: "Soğuk Kahveler", GR: "Soğuk Kahveler" },
    subtitle: { TR: "Buz gibi serinletici", BG: "Buz gibi serinletici", GR: "Buz gibi serinletici" },
    items: [
      { name: { TR: "Ice Latte", BG: "Ice Latte", GR: "Ice Latte" }, desc: { TR: "Buzlu sütlü espresso", BG: "Buzlu sütlü espresso", GR: "Buzlu sütlü espresso" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/08f52746-4bb2-4cd3-97e2-d0172bce86af.jpg" },
      { name: { TR: "Ice Mocha", BG: "Ice Mocha", GR: "Ice Mocha" }, desc: { TR: "Buzlu çikolatalı latte", BG: "Buzlu çikolatalı latte", GR: "Buzlu çikolatalı latte" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/709df36f-55f4-42d0-91ab-7459ad922f46.jpg" },
      { name: { TR: "Ice White Mocha", BG: "Ice White Mocha", GR: "Ice White Mocha" }, desc: { TR: "Buzlu beyaz çikolatalı latte", BG: "Buzlu beyaz çikolatalı latte", GR: "Buzlu beyaz çikolatalı latte" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/3bc75d59-c92d-4042-917b-c3de248fe70d.jpg" },
      { name: { TR: "Ice Americano", BG: "Ice Americano", GR: "Ice Americano" }, desc: { TR: "Buzlu sade kahve", BG: "Buzlu sade kahve", GR: "Buzlu sade kahve" }, price: "130 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/ec67c1fb-b834-4e4b-b6ab-ce6d0c356911.jpg" },
      { name: { TR: "Ice Orange Latte", BG: "Ice Orange Latte", GR: "Ice Orange Latte" }, desc: { TR: "Portakal aromalı buzlu latte", BG: "Portakal aromalı buzlu latte", GR: "Portakal aromalı buzlu latte" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/bbeb2e21-c1f8-4ff5-950f-758aa01641b2.jpg" },
      { name: { TR: "Ice Mango Latte", BG: "Ice Mango Latte", GR: "Ice Mango Latte" }, desc: { TR: "Mango aromalı buzlu latte", BG: "Mango aromalı buzlu latte", GR: "Mango aromalı buzlu latte" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/77852661-1dd2-42d2-af9f-0ea3a0d5f5a6.jpg" },
    ]
  },
  {
    id: "frappe",
    title: { TR: "Frappeler", BG: "Frappeler", GR: "Frappeler" },
    subtitle: { TR: "Buz gibi karışımlar", BG: "Buz gibi karışımlar", GR: "Buz gibi karışımlar" },
    items: [
      { name: { TR: "Frappe", BG: "Frappe", GR: "Frappe" }, desc: { TR: "Klasik yunan frappe", BG: "Klasik yunan frappe", GR: "Klasik yunan frappe" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/d4edce20-f3aa-4ffd-907c-5e24f176e347.jpg" },
      { name: { TR: "Karamel Frappe", BG: "Karamel Frappe", GR: "Karamel Frappe" }, desc: { TR: "Karamelli frappe", BG: "Karamelli frappe", GR: "Karamelli frappe" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/8922298c-c8af-4984-b925-8c6ec7fdcc2d.jpg" },
      { name: { TR: "Çikolatalı Frappe", BG: "Çikolatalı Frappe", GR: "Çikolatalı Frappe" }, desc: { TR: "Çikolatalı frappe", BG: "Çikolatalı frappe", GR: "Çikolatalı frappe" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/ef18c16e-8939-428e-9972-4cc7747c8094.jpg" },
      { name: { TR: "Vanilyalı Frappe", BG: "Vanilyalı Frappe", GR: "Vanilyalı Frappe" }, desc: { TR: "Vanilyalı frappe", BG: "Vanilyalı frappe", GR: "Vanilyalı frappe" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/c53bb1e8-fa11-46b9-be99-a0f4131b1e1f.jpg" },
      { name: { TR: "Fındıklı Frappe", BG: "Fındıklı Frappe", GR: "Fındıklı Frappe" }, desc: { TR: "Fındıklı frappe", BG: "Fındıklı frappe", GR: "Fındıklı frappe" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/b674ce3f-c041-4d99-8019-b9f55b5cf61e.jpg" },
    ]
  },
  {
    id: "soguk_cikolatalar",
    title: { TR: "Soğuk Çikolatalar", BG: "Soğuk Çikolatalar", GR: "Soğuk Çikolatalar" },
    subtitle: { TR: "Buz gibi çikolata keyfi", BG: "Buz gibi çikolata keyfi", GR: "Buz gibi çikolata keyfi" },
    items: [
      { name: { TR: "Soğuk Çikolata", BG: "Soğuk Çikolata", GR: "Soğuk Çikolata" }, desc: { TR: "Soğuk Çikolata", BG: "Soğuk Çikolata", GR: "Soğuk Çikolata" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/0148ba7c-78a5-4879-bc54-389eea396104.jpg" },
      { name: { TR: "Beyaz Çikolata", BG: "Beyaz Çikolata", GR: "Beyaz Çikolata" }, desc: { TR: "Beyaz Çikolata", BG: "Beyaz Çikolata", GR: "Beyaz Çikolata" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Çilekli Çikolata", BG: "Çilekli Çikolata", GR: "Çilekli Çikolata" }, desc: { TR: "Çilekli Çikolata", BG: "Çilekli Çikolata", GR: "Çilekli Çikolata" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Muzlu Çikolata", BG: "Muzlu Çikolata", GR: "Muzlu Çikolata" }, desc: { TR: "Muzlu Çikolata", BG: "Muzlu Çikolata", GR: "Muzlu Çikolata" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Fındıklı Çikolata", BG: "Fındıklı Çikolata", GR: "Fındıklı Çikolata" }, desc: { TR: "Fındıklı Çikolata", BG: "Fındıklı Çikolata", GR: "Fındıklı Çikolata" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Karamelli Çikolata", BG: "Karamelli Çikolata", GR: "Karamelli Çikolata" }, desc: { TR: "Karamelli Çikolata", BG: "Karamelli Çikolata", GR: "Karamelli Çikolata" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
    ]
  },
  {
    id: "smoothie",
    title: { TR: "Smoothie", BG: "Smoothie", GR: "Smoothie" },
    subtitle: { TR: "Taze meyveli serinlik", BG: "Taze meyveli serinlik", GR: "Taze meyveli serinlik" },
    items: [
      { name: { TR: "Çilekli Smoothie", BG: "Çilekli Smoothie", GR: "Çilekli Smoothie" }, desc: { TR: "Çilekli Smoothie", BG: "Çilekli Smoothie", GR: "Çilekli Smoothie" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/d4677312-aea9-47a9-9957-e9a5bbe27e99.jpg" },
      { name: { TR: "Karadutlu Smoothie", BG: "Karadutlu Smoothie", GR: "Karadutlu Smoothie" }, desc: { TR: "Karadutlu Smoothie", BG: "Karadutlu Smoothie", GR: "Karadutlu Smoothie" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/59dc04b1-8790-4a99-9b2b-7fdfa3032362.jpg" },
      { name: { TR: "Kavunlu Smoothie", BG: "Kavunlu Smoothie", GR: "Kavunlu Smoothie" }, desc: { TR: "Kavunlu Smoothie", BG: "Kavunlu Smoothie", GR: "Kavunlu Smoothie" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/0ad5183d-ca41-4832-a0d6-a30eb318f664.jpg" },
      { name: { TR: "Kivili Smoothie", BG: "Kivili Smoothie", GR: "Kivili Smoothie" }, desc: { TR: "Kivili Smoothie", BG: "Kivili Smoothie", GR: "Kivili Smoothie" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/b8592292-306d-4bb1-808b-d54e525270fe.jpg" },
      { name: { TR: "Muzlu Smoothie", BG: "Muzlu Smoothie", GR: "Muzlu Smoothie" }, desc: { TR: "Muzlu Smoothie", BG: "Muzlu Smoothie", GR: "Muzlu Smoothie" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/d0f6bad3-df31-423a-b2c6-7799412e6468.jpg" },
    ]
  },
  {
    id: "milkshake",
    title: { TR: "Milkshake", BG: "Milkshake", GR: "Milkshake" },
    subtitle: { TR: "Kremalı ve serinletici", BG: "Kremalı ve serinletici", GR: "Kremalı ve serinletici" },
    items: [
      { name: { TR: "Çilekli Milkshake", BG: "Çilekli Milkshake", GR: "Çilekli Milkshake" }, desc: { TR: "Çilekli Milkshake", BG: "Çilekli Milkshake", GR: "Çilekli Milkshake" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/58ca1aad-5115-484d-889e-1691db0235bd.jpg" },
      { name: { TR: "Çikolatalı Milkshake", BG: "Çikolatalı Milkshake", GR: "Çikolatalı Milkshake" }, desc: { TR: "Çikolatalı Milkshake", BG: "Çikolatalı Milkshake", GR: "Çikolatalı Milkshake" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/caafb11b-841c-48da-976a-ee39a7797397.jpg" },
      { name: { TR: "Vanilyalı Milkshake", BG: "Vanilyalı Milkshake", GR: "Vanilyalı Milkshake" }, desc: { TR: "Vanilyalı Milkshake", BG: "Vanilyalı Milkshake", GR: "Vanilyalı Milkshake" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/514e2e59-a009-45b8-ab33-2f68e7d3ff08.jpg" },
      { name: { TR: "Karamelli Milkshake", BG: "Karamelli Milkshake", GR: "Karamelli Milkshake" }, desc: { TR: "Karamelli Milkshake", BG: "Karamelli Milkshake", GR: "Karamelli Milkshake" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/90026752-a544-4251-94c1-9fea561be6f2.jpg" },
      { name: { TR: "Muzlu Milkshake", BG: "Muzlu Milkshake", GR: "Muzlu Milkshake" }, desc: { TR: "Muzlu Milkshake", BG: "Muzlu Milkshake", GR: "Muzlu Milkshake" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/d0b00bfc-1868-4480-a326-9e762d1398a9.jpg" },
      { name: { TR: "Oreolu Milkshake", BG: "Oreolu Milkshake", GR: "Oreolu Milkshake" }, desc: { TR: "Oreolu Milkshake", BG: "Oreolu Milkshake", GR: "Oreolu Milkshake" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/84e65e3c-5492-4e32-998f-e61bd4b4eef4.jpg" },
    ]
  },
  {
    id: "frozen",
    title: { TR: "Frozen", BG: "Frozen", GR: "Frozen" },
    subtitle: { TR: "Buzlu meyve karışımları", BG: "Buzlu meyve karışımları", GR: "Buzlu meyve karışımları" },
    items: [
      { name: { TR: "Çilekli Frozen", BG: "Çilekli Frozen", GR: "Çilekli Frozen" }, desc: { TR: "Çilekli Frozen", BG: "Çilekli Frozen", GR: "Çilekli Frozen" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/01eb2e58-2f8e-4fb7-92e1-2b59de84496e.jpg" },
      { name: { TR: "Elmalı Frozen", BG: "Elmalı Frozen", GR: "Elmalı Frozen" }, desc: { TR: "Elmalı Frozen", BG: "Elmalı Frozen", GR: "Elmalı Frozen" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Kivili Frozen", BG: "Kivili Frozen", GR: "Kivili Frozen" }, desc: { TR: "Kivili Frozen", BG: "Kivili Frozen", GR: "Kivili Frozen" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/d6ece862-c931-4a28-a2c4-1bd1f1fe7b07.jpg" },
      { name: { TR: "Karpuzlu Frozen", BG: "Karpuzlu Frozen", GR: "Karpuzlu Frozen" }, desc: { TR: "Karpuzlu Frozen", BG: "Karpuzlu Frozen", GR: "Karpuzlu Frozen" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/dbaa1c3d-ec1e-438c-822b-d8c176e6a236.jpg" },
      { name: { TR: "Nane-Limonlu Frozen", BG: "Nane-Limonlu Frozen", GR: "Nane-Limonlu Frozen" }, desc: { TR: "Nane-Limonlu Frozen", BG: "Nane-Limonlu Frozen", GR: "Nane-Limonlu Frozen" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/d05e82ee-3a65-4d70-9022-d048f053bb26.jpg" },
      { name: { TR: "Kavunlu Frozen", BG: "Kavunlu Frozen", GR: "Kavunlu Frozen" }, desc: { TR: "Kavunlu Frozen", BG: "Kavunlu Frozen", GR: "Kavunlu Frozen" }, price: "170 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/b6d59bf3-ce64-4637-8d4a-e292c52b31b9.jpg" },
    ]
  },
  {
    id: "special_soguk_icecekler",
    title: { TR: "Special Soğuk İçecekler", BG: "Special Soğuk İçecekler", GR: "Special Soğuk İçecekler" },
    subtitle: { TR: "Stella'ya özel tarifler", BG: "Stella'ya özel tarifler", GR: "Stella'ya özel tarifler" },
    items: [
      { name: { TR: "Blue Vanilla", BG: "Blue Vanilla", GR: "Blue Vanilla" }, desc: { TR: "Blue Vanilla", BG: "Blue Vanilla", GR: "Blue Vanilla" }, price: "175 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Green Life", BG: "Green Life", GR: "Green Life" }, desc: { TR: "Green Life", BG: "Green Life", GR: "Green Life" }, price: "175 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/9fa9167d-08cb-4084-a3ab-5264c8f83da7.jpg" },
      { name: { TR: "Ice Matcha Latte - Strawberry", BG: "Ice Matcha Latte - Strawberry", GR: "Ice Matcha Latte - Strawberry" }, desc: { TR: "Ice Matcha Latte - Strawberry", BG: "Ice Matcha Latte - Strawberry", GR: "Ice Matcha Latte - Strawberry" }, price: "200 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/45b26b41-b5b6-41a3-ac9b-1e515a8612c4.jpg" },
      { name: { TR: "Ice Black Honey", BG: "Ice Black Honey", GR: "Ice Black Honey" }, desc: { TR: "Ice Black Honey", BG: "Ice Black Honey", GR: "Ice Black Honey" }, price: "175 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Rainbow", BG: "Rainbow", GR: "Rainbow" }, desc: { TR: "Rainbow", BG: "Rainbow", GR: "Rainbow" }, price: "175 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/19e4cecf-bbfd-497e-a274-99b7dd81663d.jpg" },
      { name: { TR: "Mojito Strawberry", BG: "Mojito Strawberry", GR: "Mojito Strawberry" }, desc: { TR: "Mojito Strawberry", BG: "Mojito Strawberry", GR: "Mojito Strawberry" }, price: "175 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/d3d79e66-ebae-4cb8-ba67-8cc51e39a190.jpg" },
      { name: { TR: "Mojito Apple", BG: "Mojito Apple", GR: "Mojito Apple" }, desc: { TR: "Mojito Apple", BG: "Mojito Apple", GR: "Mojito Apple" }, price: "175 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/d3d79e66-ebae-4cb8-ba67-8cc51e39a190.jpg" },
      { name: { TR: "Stella Drink", BG: "Stella Drink", GR: "Stella Drink" }, desc: { TR: "Stella Drink", BG: "Stella Drink", GR: "Stella Drink" }, price: "175 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Blue Dream", BG: "Blue Dream", GR: "Blue Dream" }, desc: { TR: "Blue Dream", BG: "Blue Dream", GR: "Blue Dream" }, price: "175 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Ice Chocolate Mint", BG: "Ice Chocolate Mint", GR: "Ice Chocolate Mint" }, desc: { TR: "Ice Chocolate Mint", BG: "Ice Chocolate Mint", GR: "Ice Chocolate Mint" }, price: "175 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/938f1f87-9fb3-4ac6-b899-c12fa872da82.jpg" },
    ]
  },
  {
    id: "soguk_icecekler",
    title: { TR: "Soğuk İçecekler", BG: "Soğuk İçecekler", GR: "Soğuk İçecekler" },
    subtitle: { TR: "Klasik serinleticiler", BG: "Klasik serinleticiler", GR: "Klasik serinleticiler" },
    items: [
      { name: { TR: "Coca Cola", BG: "Coca Cola", GR: "Coca Cola" }, desc: { TR: "Coca Cola", BG: "Coca Cola", GR: "Coca Cola" }, price: "75 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/9896f26d-0184-4580-8387-18b4f79ce5c6.jpg" },
      { name: { TR: "Light Cola", BG: "Light Cola", GR: "Light Cola" }, desc: { TR: "Light Cola", BG: "Light Cola", GR: "Light Cola" }, price: "75 ₺", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
      { name: { TR: "Zero Cola", BG: "Zero Cola", GR: "Zero Cola" }, desc: { TR: "Zero Cola", BG: "Zero Cola", GR: "Zero Cola" }, price: "75 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/fa3c147e-4190-4894-827e-0ed6a4a09ea2.jpg" },
      { name: { TR: "Fruko", BG: "Fruko", GR: "Fruko" }, desc: { TR: "Fruko", BG: "Fruko", GR: "Fruko" }, price: "75 ₺", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
      { name: { TR: "Yedigün", BG: "Yedigün", GR: "Yedigün" }, desc: { TR: "Yedigün", BG: "Yedigün", GR: "Yedigün" }, price: "75 ₺", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
      { name: { TR: "Meyve Suyu Şeftali", BG: "Meyve Suyu Şeftali", GR: "Meyve Suyu Şeftali" }, desc: { TR: "Meyve Suyu Şeftali", BG: "Meyve Suyu Şeftali", GR: "Meyve Suyu Şeftali" }, price: "75 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/19bc3480-8b58-4e46-bf85-637c9bd22762.jpg" },
      { name: { TR: "Meyve Suyu Kayısı", BG: "Meyve Suyu Kayısı", GR: "Meyve Suyu Kayısı" }, desc: { TR: "Meyve Suyu Kayısı", BG: "Meyve Suyu Kayısı", GR: "Meyve Suyu Kayısı" }, price: "75 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/19bc3480-8b58-4e46-bf85-637c9bd22762.jpg" },
      { name: { TR: "Meyve Suyu Vişne", BG: "Meyve Suyu Vişne", GR: "Meyve Suyu Vişne" }, desc: { TR: "Meyve Suyu Vişne", BG: "Meyve Suyu Vişne", GR: "Meyve Suyu Vişne" }, price: "75 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/19bc3480-8b58-4e46-bf85-637c9bd22762.jpg" },
      { name: { TR: "Meyve Suyu Karışık", BG: "Meyve Suyu Karışık", GR: "Meyve Suyu Karışık" }, desc: { TR: "Meyve Suyu Karışık", BG: "Meyve Suyu Karışık", GR: "Meyve Suyu Karışık" }, price: "75 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/19bc3480-8b58-4e46-bf85-637c9bd22762.jpg" },
      { name: { TR: "Ice Tea Şeftali", BG: "Ice Tea Şeftali", GR: "Ice Tea Şeftali" }, desc: { TR: "Ice Tea Şeftali", BG: "Ice Tea Şeftali", GR: "Ice Tea Şeftali" }, price: "75 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/659d22c2-f4d4-48b8-a12f-23ca279fc737.jpg" },
      { name: { TR: "Ice Tea Limon", BG: "Ice Tea Limon", GR: "Ice Tea Limon" }, desc: { TR: "Ice Tea Limon", BG: "Ice Tea Limon", GR: "Ice Tea Limon" }, price: "75 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/659d22c2-f4d4-48b8-a12f-23ca279fc737.jpg" },
      { name: { TR: "Ice Tea Mango", BG: "Ice Tea Mango", GR: "Ice Tea Mango" }, desc: { TR: "Ice Tea Mango", BG: "Ice Tea Mango", GR: "Ice Tea Mango" }, price: "75 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/659d22c2-f4d4-48b8-a12f-23ca279fc737.jpg" },
      { name: { TR: "Enerji İçeceği", BG: "Enerji İçeceği", GR: "Enerji İçeceği" }, desc: { TR: "Enerji İçeceği", BG: "Enerji İçeceği", GR: "Enerji İçeceği" }, price: "125 ₺", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
      { name: { TR: "Sade Soda", BG: "Sade Soda", GR: "Sade Soda" }, desc: { TR: "Sade Soda", BG: "Sade Soda", GR: "Sade Soda" }, price: "50 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/18deb78e-b8d4-4137-a663-df825161ac5e.jpg" },
      { name: { TR: "Meyveli Soda", BG: "Meyveli Soda", GR: "Meyveli Soda" }, desc: { TR: "Meyveli Soda", BG: "Meyveli Soda", GR: "Meyveli Soda" }, price: "60 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/fc6435e2-5c2b-40d0-91be-3aa27bba231e.jpg" },
      { name: { TR: "Churchill", BG: "Churchill", GR: "Churchill" }, desc: { TR: "Churchill", BG: "Churchill", GR: "Churchill" }, price: "75 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/fcfae8a4-2fb3-4d22-bbf7-7c7af1e14e5f.jpg" },
      { name: { TR: "Ayran", BG: "Ayran", GR: "Ayran" }, desc: { TR: "Ayran", BG: "Ayran", GR: "Ayran" }, price: "40 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/ff800a55-be26-4653-865c-747d747abbcf.jpg" },
      { name: { TR: "Limonata", BG: "Limonata", GR: "Limonata" }, desc: { TR: "Limonata", BG: "Limonata", GR: "Limonata" }, price: "75 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/320349e8-7347-45ff-ac99-afc72345c064.jpg" },
      { name: { TR: "Çilekli Limonata", BG: "Çilekli Limonata", GR: "Çilekli Limonata" }, desc: { TR: "Çilekli Limonata", BG: "Çilekli Limonata", GR: "Çilekli Limonata" }, price: "90 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/3cdf4c81-b7be-4662-9c58-2f1b3b843d62.jpg" },
      { name: { TR: "Naneli Limonata", BG: "Naneli Limonata", GR: "Naneli Limonata" }, desc: { TR: "Naneli Limonata", BG: "Naneli Limonata", GR: "Naneli Limonata" }, price: "90 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/7c7450c5-f1a4-462a-b31a-5f668d1e1e50.jpg" },
      { name: { TR: "Su", BG: "Su", GR: "Su" }, desc: { TR: "Su", BG: "Su", GR: "Su" }, price: "25 ₺", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
    ]
  },
  {
    id: "sikma_meyve_sulari",
    title: { TR: "Sıkma Meyve Suları", BG: "Sıkma Meyve Suları", GR: "Sıkma Meyve Suları" },
    subtitle: { TR: "Taze sıkılmış doğallık", BG: "Taze sıkılmış doğallık", GR: "Taze sıkılmış doğallık" },
    items: [
      { name: { TR: "Portakal Suyu", BG: "Portakal Suyu", GR: "Portakal Suyu" }, desc: { TR: "Taze sıkılmış", BG: "Taze sıkılmış", GR: "Taze sıkılmış" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/0b001ab6-3bcc-4d55-9fdb-18d5f2f77a15.jpg" },
      { name: { TR: "Nar Suyu", BG: "Nar Suyu", GR: "Nar Suyu" }, desc: { TR: "Taze sıkılmış nar suyu", BG: "Taze sıkılmış nar suyu", GR: "Taze sıkılmış nar suyu" }, price: "150 ₺", img: "https://xdavnqepmbdqoivygdey.supabase.co/storage/v1/object/public/menu-images/products/834b6235-e806-49c7-83e7-a31001eeb459.jpg" },
      { name: { TR: "Atom", BG: "Atom", GR: "Atom" }, desc: { TR: "Atom", BG: "Atom", GR: "Atom" }, price: "175 ₺", img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80" },
    ]
  },
];
