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
  items: Item[];
};

export const categories: Category[] = [
  {
    id: "snacks",
    title: { TR: "Atıştırmalıklar", BG: "Снекс", GR: "Σνακ" },
    subtitle: { TR: "Paylaşmalık lezzetler", BG: "Вкусни хапки", GR: "Νόστιμες μπουκιές" },
    items: [
      { name: { TR: "Kalem Böreği", BG: "Kalem Böreği", GR: "Kalem Böreği" }, desc: { TR: "Çıtır kalem böreği", BG: "Хрупкава баница", GR: "Τραγανό μπουρέκι" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
      { name: { TR: "Soğan Halkası + Patates", BG: "Soğan Halkası", GR: "Soğan Halkası" }, desc: { TR: "Çıtır soğan halkaları ve patates kızartması", BG: "Лучени кръгчета с картофки", GR: "Ροδέλες κρεμμυδιού με πατάτες" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80" },
      { name: { TR: "Elma Dilim Cips", BG: "Elma Dilim Cips", GR: "Elma Dilim Cips" }, desc: { TR: "Baharatlı elma dilim patates", BG: "Пикантни картофи", GR: "Πικάντικες πατάτες" }, price: "225 ₺", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80" },
      { name: { TR: "Patates Cips", BG: "Patates Cips", GR: "Patates Cips" }, desc: { TR: "İnce kesim çıtır patates", BG: "Пържени картофи", GR: "Τηγανιτές πατάτες" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80" },
      { name: { TR: "Sosis Tabağı + Patates", BG: "Sosis Tabağı", GR: "Sosis Tabağı" }, desc: { TR: "Kızarmış sosis ve patates", BG: "Наденица с картофи", GR: "Λουκάνικο με πατάτες" }, price: "250 ₺", img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80" },
      { name: { TR: "Stella Sepet", BG: "Stella Sepet", GR: "Stella Sepet" }, desc: { TR: "Özel karışım atıştırmalık sepeti", BG: "Микс кошница", GR: "Μικτό καλάθι" }, price: "300 ₺", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
      { name: { TR: "Gözleme", BG: "Gözleme", GR: "Gözleme" }, desc: { TR: "Geleneksel Türk gözlemesi", BG: "Традиционна гюзлеме", GR: "Παραδοσιακό γκιουζλεμέ" }, price: "250 ₺", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
      { name: { TR: "Kumru + Patates", BG: "Kumru", GR: "Kumru" }, desc: { TR: "İzmir usulü kumru ve patates", BG: "Сандвич Кумру", GR: "Σάντουιτς Kumru" }, price: "250 ₺", img: "https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?w=400&q=80" },
      { name: { TR: "Patso", BG: "Patso", GR: "Patso" }, desc: { TR: "Bol patatesli sandviç", BG: "Сандвич с картофи", GR: "Σάντουιτς με πατάτες" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80" },
      { name: { TR: "Menemen", BG: "Menemen", GR: "Menemen" }, desc: { TR: "Taze domates ve biberli menemen", BG: "Менемен", GR: "Μενεμέν" }, price: "250 ₺", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
      { name: { TR: "Kaşarlı Menemen", BG: "Kaşarlı Menemen", GR: "Kaşarlı Menemen" }, desc: { TR: "Bol kaşarlı sıcak menemen", BG: "Менемен с кашкавал", GR: "Μενεμέν με τυρί" }, price: "270 ₺", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
      { name: { TR: "Sucuklu Yumurta", BG: "Sucuklu Yumurta", GR: "Sucuklu Yumurta" }, desc: { TR: "Kasap sucuklu sahanda yumurta", BG: "Яйца с суджук", GR: "Αυγά με σουτζούκι" }, price: "270 ₺", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
      { name: { TR: "Sade Omlet", BG: "Sade Omlet", GR: "Sade Omlet" }, desc: { TR: "Klasik omlet", BG: "Класически омлет", GR: "Κλασική ομελέτα" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1510693225872-2051db3f05b9?w=400&q=80" },
      { name: { TR: "Kaşarlı Omlet", BG: "Kaşarlı Omlet", GR: "Kaşarlı Omlet" }, desc: { TR: "Eriyen kaşar peynirli omlet", BG: "Омлет с кашкавал", GR: "Ομελέτα με τυρί" }, price: "250 ₺", img: "https://images.unsplash.com/photo-1510693225872-2051db3f05b9?w=400&q=80" },
      { name: { TR: "Kavurmalı Omlet", BG: "Kavurmalı Omlet", GR: "Kavurmalı Omlet" }, desc: { TR: "Özel kavurmalı doyurucu omlet", BG: "Омлет с кавурма", GR: "Ομελέτα με καβουρμά" }, price: "350 ₺", img: "https://images.unsplash.com/photo-1510693225872-2051db3f05b9?w=400&q=80" },
    ]
  },
  {
    id: "toasts_burgers",
    title: { TR: "Tostlar & Burgerler", BG: "Тостове & Бургери", GR: "Τοστ & Μπέργκερ" },
    subtitle: { TR: "Doyurucu sokak lezzetleri", BG: "Вкусни сандвичи", GR: "Νόστιμα σάντουιτς" },
    items: [
      { name: { TR: "Kaşarlı Tost + Patates", BG: "Kaşarlı Tost", GR: "Kaşarlı Tost" }, desc: { TR: "Bol kaşarlı klasik tost", BG: "Тост с кашкавал", GR: "Τοστ με τυρί" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
      { name: { TR: "Sucuklu Tost + Patates", BG: "Sucuklu Tost", GR: "Sucuklu Tost" }, desc: { TR: "Baharatlı sucuklu tost", BG: "Тост със суджук", GR: "Τοστ με σουτζούκι" }, price: "225 ₺", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
      { name: { TR: "Karışık Tost + Patates", BG: "Karışık Tost", GR: "Karışık Tost" }, desc: { TR: "Sucuk ve kaşarın efsane uyumu", BG: "Смесен тост", GR: "Ανάμεικτο τοστ" }, price: "250 ₺", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
      { name: { TR: "Kavurmalı Kaşarlı Tost + Patates", BG: "Kavurmalı Tost", GR: "Kavurmalı Tost" }, desc: { TR: "Kavurma ve eriyen kaşar", BG: "Тост с кавурма", GR: "Τοστ με καβουρμά" }, price: "320 ₺", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
      { name: { TR: "Beyaz Peynirli Domatesli Tost + Patates", BG: "Peynirli Tost", GR: "Peynirli Tost" }, desc: { TR: "Taze domates ve beyaz peynir", BG: "Тост със сирене", GR: "Τοστ με τυρί" }, price: "225 ₺", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
      { name: { TR: "Üç Peynirli Tost + Patates", BG: "Üç Peynirli Tost", GR: "Üç Peynirli Tost" }, desc: { TR: "Özel üç peynir karışımı", BG: "Тост с 3 сирена", GR: "Τοστ με 3 τυριά" }, price: "300 ₺", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
      { name: { TR: "Stella Burger + Patates", BG: "Stella Burger", GR: "Stella Burger" }, desc: { TR: "Şefin özel tarifiyle Stella Burger", BG: "Стела Бургер", GR: "Stella Μπέργκερ" }, price: "300 ₺", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
      { name: { TR: "Cheese Burger + Patates", BG: "Cheese Burger", GR: "Cheese Burger" }, desc: { TR: "Çift kat cheddar peynirli", BG: "Чийзбургер", GR: "Τσίζμπεργκερ" }, price: "325 ₺", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
      { name: { TR: "Big Burger + Patates", BG: "Big Burger", GR: "Big Burger" }, desc: { TR: "Ekstra büyük ev yapımı köfte", BG: "Голям Бургер", GR: "Μεγάλο Μπέργκερ" }, price: "525 ₺", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
      { name: { TR: "Chicken Burger + Patates", BG: "Chicken Burger", GR: "Chicken Burger" }, desc: { TR: "Çıtır tavuk göğsü", BG: "Пилешки Бургер", GR: "Μπέργκερ Κοτόπουλο" }, price: "250 ₺", img: "https://images.unsplash.com/photo-1615719413546-198b25453f85?w=400&q=80" },
      { name: { TR: "Izgara Tavuk Burger + Patates", BG: "Izgara Tavuk Burger", GR: "Izgara Tavuk Burger" }, desc: { TR: "Sağlıklı ızgara tavuk burger", BG: "Бургер с пиле на скара", GR: "Μπέργκερ κοτόπουλο σχάρας" }, price: "275 ₺", img: "https://images.unsplash.com/photo-1615719413546-198b25453f85?w=400&q=80" },
      { name: { TR: "Smash Burger + Patates", BG: "Smash Burger", GR: "Smash Burger" }, desc: { TR: "Karidelenmiş ezme köfte", BG: "Смаш Бургер", GR: "Smash Μπέργκερ" }, price: "400 ₺", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
    ]
  },
  {
    id: "pasta_pizzas",
    title: { TR: "Makarnalar & Pizzalar", BG: "Паста & Пица", GR: "Ζυμαρικά & Πίτσα" },
    subtitle: { TR: "İtalyan esintisi", BG: "Италиански вкус", GR: "Ιταλική γεύση" },
    items: [
      { name: { TR: "Spagetti Napoliten", BG: "Spagetti Napoliten", GR: "Spagetti Napoliten" }, desc: { TR: "Taze fesleğenli domates soslu", BG: "С доматен сос", GR: "Με σάλτσα ντομάτας" }, price: "325 ₺", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80" },
      { name: { TR: "Noodle", BG: "Noodle", GR: "Noodle" }, desc: { TR: "Asya usulü sebzeli noodle", BG: "Нудли", GR: "Νουντλς" }, price: "380 ₺", img: "https://images.unsplash.com/photo-1612929633738-8fe01f7c8166?w=400&q=80" },
      { name: { TR: "Penne Arrabbiata", BG: "Penne Arrabbiata", GR: "Penne Arrabbiata" }, desc: { TR: "Acılı domates soslu penne", BG: "Пикантна паста", GR: "Πικάντικα ζυμαρικά" }, price: "325 ₺", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80" },
      { name: { TR: "Penne Elenora Tavuklu", BG: "Penne Elenora", GR: "Penne Elenora" }, desc: { TR: "Özel soslu tavuklu penne", BG: "Паста с пиле", GR: "Ζυμαρικά με κοτόπουλο" }, price: "380 ₺", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80" },
      { name: { TR: "Fettuccine Alfredo", BG: "Fettuccine Alfredo", GR: "Fettuccine Alfredo" }, desc: { TR: "Krema, mantar ve parmesan", BG: "Сметана и гъби", GR: "Κρέμα και μανιτάρια" }, price: "380 ₺", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80" },
      { name: { TR: "Margherita Pizza", BG: "Margherita Pizza", GR: "Margherita Pizza" }, desc: { TR: "Küçük: 275₺ | Orta: 325₺ | Büyük: 375₺", BG: "Пица Маргарита", GR: "Πίτσα Μαργαρίτα" }, price: "275 ₺ - 375 ₺", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
      { name: { TR: "Benmari Pizza", BG: "Benmari Pizza", GR: "Benmari Pizza" }, desc: { TR: "Küçük: 275₺ | Orta: 325₺ | Büyük: 375₺", BG: "Пица Бенмари", GR: "Πίτσα Benmari" }, price: "275 ₺ - 375 ₺", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
      { name: { TR: "Vegetarian Pizza", BG: "Vegetarian Pizza", GR: "Vegetarian Pizza" }, desc: { TR: "Küçük: 275₺ | Orta: 325₺ | Büyük: 375₺", BG: "Вегетарианска пица", GR: "Χορτοφαγική πίτσα" }, price: "275 ₺ - 375 ₺", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
      { name: { TR: "Condoleeza Pizza", BG: "Condoleeza Pizza", GR: "Condoleeza Pizza" }, desc: { TR: "Küçük: 300₺ | Orta: 350₺ | Büyük: 400₺", BG: "Пица", GR: "Πίτσα" }, price: "300 ₺ - 400 ₺", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
      { name: { TR: "Napoliten Pizza", BG: "Napoliten Pizza", GR: "Napoliten Pizza" }, desc: { TR: "Küçük: 300₺ | Orta: 350₺ | Büyük: 400₺", BG: "Пица Наполи", GR: "Πίτσα Νάπολι" }, price: "300 ₺ - 400 ₺", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
      { name: { TR: "İtaliano Pizza", BG: "İtaliano Pizza", GR: "İtaliano Pizza" }, desc: { TR: "Küçük: 375₺ | Orta: 450₺ | Büyük: 525₺", BG: "Пица Италиано", GR: "Πίτσα Ιταλιάνο" }, price: "375 ₺ - 525 ₺", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
      { name: { TR: "Romano Pizza", BG: "Romano Pizza", GR: "Romano Pizza" }, desc: { TR: "Küçük: 375₺ | Orta: 450₺ | Büyük: 525₺", BG: "Пица Романо", GR: "Πίτσα Ρομάνο" }, price: "375 ₺ - 525 ₺", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
      { name: { TR: "Stella Gurme Pizza", BG: "Stella Gurme Pizza", GR: "Stella Gurme Pizza" }, desc: { TR: "Küçük: 375₺ | Orta: 450₺ | Büyük: 525₺", BG: "Гурме пица", GR: "Gourmet Πίτσα" }, price: "375 ₺ - 525 ₺", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
    ]
  },
  {
    id: "main_courses",
    title: { TR: "Ana Yemekler & Izgaralar", BG: "Основни Ястия", GR: "Κυρίως Πιάτα" },
    subtitle: { TR: "Özenle hazırlanmış et ve tavuk menüleri", BG: "Месо и пиле", GR: "Κρέας και κοτόπουλο" },
    items: [
      { name: { TR: "Köri Soslu Tavuk", BG: "Köri Soslu Tavuk", GR: "Köri Soslu Tavuk" }, desc: { TR: "Özel Hint köri sosuyla", BG: "Пиле с къри", GR: "Κοτόπουλο με κάρυ" }, price: "350 ₺", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80" },
      { name: { TR: "Barbekü Soslu Tavuk", BG: "Barbekü Soslu Tavuk", GR: "Barbekü Soslu Tavuk" }, desc: { TR: "Tütsülenmiş barbekü soslu", BG: "Пиле с барбекю сос", GR: "Κοτόπουλο με σως BBQ" }, price: "350 ₺", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80" },
      { name: { TR: "Meksika Soslu Tavuk", BG: "Meksika Soslu Tavuk", GR: "Meksika Soslu Tavuk" }, desc: { TR: "Acı ve tatlı soslu tavuk", BG: "Пиле с мексикански сос", GR: "Κοτόπουλο με μεξικάνικη σως" }, price: "350 ₺", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80" },
      { name: { TR: "Chili Soslu Tavuk", BG: "Chili Soslu Tavuk", GR: "Chili Soslu Tavuk" }, desc: { TR: "Tatlı acı chili soslu", BG: "Пиле с чили", GR: "Κοτόπουλο με τσίλι" }, price: "350 ₺", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80" },
      { name: { TR: "Dağ Kekikli Tavuk", BG: "Dağ Kekikli Tavuk", GR: "Dağ Kekikli Tavuk" }, desc: { TR: "Taze kekik aromalı", BG: "Пиле с мащерка", GR: "Κοτόπουλο με θυμάρι" }, price: "350 ₺", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80" },
      { name: { TR: "Püre Yatağında Tavuk", BG: "Püre Yatağında Tavuk", GR: "Püre Yatağında Tavuk" }, desc: { TR: "Kremalı püre eşliğinde", BG: "Пиле с картофено пюре", GR: "Κοτόπουλο με πουρέ" }, price: "350 ₺", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80" },
      { name: { TR: "Tavuk Çöp Şiş", BG: "Tavuk Çöp Şiş", GR: "Tavuk Çöp Şiş" }, desc: { TR: "Marine edilmiş şiş tavuk", BG: "Пилешки шишчета", GR: "Σουβλάκι κοτόπουλο" }, price: "350 ₺", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80" },
      { name: { TR: "Stella Gurme Tavuk", BG: "Stella Gurme Tavuk", GR: "Stella Gurme Tavuk" }, desc: { TR: "Şefin özel tavuk tarifi", BG: "Гурме пиле", GR: "Gourmet Κοτόπουλο" }, price: "375 ₺", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80" },
      { name: { TR: "Barbekü Soslu Dana", BG: "Barbekü Soslu Dana", GR: "Barbekü Soslu Dana" }, desc: { TR: "Yumuşacık dana eti, barbekü soslu", BG: "Говеждо с барбекю", GR: "Μοσχάρι με BBQ" }, price: "600 ₺", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" },
      { name: { TR: "Meksika Soslu Dana", BG: "Meksika Soslu Dana", GR: "Meksika Soslu Dana" }, desc: { TR: "Meksika soslu dana sote", BG: "Говеждо с мексикански сос", GR: "Μοσχάρι με μεξικάνικη σως" }, price: "600 ₺", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" },
      { name: { TR: "Mantar Soslu Dana", BG: "Mantar Soslu Dana", GR: "Mantar Soslu Dana" }, desc: { TR: "Kremalı mantar soslu dana eti", BG: "Говеждо с гъбен сос", GR: "Μοσχάρι με σως μανιταριών" }, price: "600 ₺", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" },
      { name: { TR: "Dana Izgara", BG: "Dana Izgara", GR: "Dana Izgara" }, desc: { TR: "Saf dana ızgara lokum", BG: "Говеждо на скара", GR: "Μοσχάρι σχάρας" }, price: "600 ₺", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" },
      { name: { TR: "Izgara Köfte", BG: "Izgara Köfte", GR: "Izgara Köfte" }, desc: { TR: "Ev yapımı anne köftesi", BG: "Кюфтета на скара", GR: "Κεφτεδάκια σχάρας" }, price: "450 ₺", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" },
    ]
  },
  {
    id: "salads",
    title: { TR: "Salatalar", BG: "Салати", GR: "Σαλάτες" },
    subtitle: { TR: "Taze ve sağlıklı seçenekler", BG: "Пресни и здравословни", GR: "Φρέσκα και υγιεινά" },
    items: [
      { name: { TR: "Akdeniz Salata", BG: "Akdeniz Salata", GR: "Akdeniz Salata" }, desc: { TR: "Zeytin ve beyaz peynirli", BG: "Средиземноморска салата", GR: "Μεσογειακή σαλάτα" }, price: "250 ₺", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
      { name: { TR: "Sezar Salata", BG: "Sezar Salata", GR: "Sezar Salata" }, desc: { TR: "Tavuklu klasik sezar", BG: "Салата Цезар", GR: "Σαλάτα του Καίσαρα" }, price: "350 ₺", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
      { name: { TR: "Kajun Salata", BG: "Kajun Salata", GR: "Kajun Salata" }, desc: { TR: "Kajun baharatlı çıtır tavuklu", BG: "Салата Каджун", GR: "Σαλάτα Cajun" }, price: "350 ₺", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
      { name: { TR: "Ton Balıklı Salata", BG: "Ton Balıklı Salata", GR: "Ton Balıklı Salata" }, desc: { TR: "Bol malzemeli ton balıklı", BG: "Салата с риба тон", GR: "Σαλάτα με τόνο" }, price: "350 ₺", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
      { name: { TR: "Antrikot Salata", BG: "Antrikot Salata", GR: "Antrikot Salata" }, desc: { TR: "Lüks dilim antrikot ile", BG: "Салата с антрекот", GR: "Σαλάτα με αντρεκότ" }, price: "500 ₺", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
    ]
  },
  {
    id: "breakfast_soups",
    title: { TR: "Çorbalar & Kahvaltı", BG: "Супи & Закуска", GR: "Σούπες & Πρωινό" },
    subtitle: { TR: "Güne sıcak bir başlangıç", BG: "Топъл старт", GR: "Ζεστό ξεκίνημα" },
    items: [
      { name: { TR: "Tavuk Suyu Çorbası", BG: "Tavuk Suyu Çorbası", GR: "Tavuk Suyu Çorbası" }, desc: { TR: "Şifa kaynağı tavuk suyu çorbası", BG: "Пилешка супа", GR: "Κοτόσουπα" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80" },
      { name: { TR: "Mercimek Çorbası", BG: "Mercimek Çorbası", GR: "Mercimek Çorbası" }, desc: { TR: "Süzme mercimek", BG: "Лещена супа", GR: "Φακόσουπα" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80" },
      { name: { TR: "Serpme Kahvaltı", BG: "Serpme Kahvaltı", GR: "Serpme Kahvaltı" }, desc: { TR: "Çay ve Türk Kahvesi Dahil", BG: "Традиционна закуска", GR: "Παραδοσιακό πρωινό" }, price: "500 ₺", img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80" },
    ]
  },
  {
    id: "desserts",
    title: { TR: "Tatlılar", BG: "Десерти", GR: "Επιδόρπια" },
    subtitle: { TR: "İmza tatlılarımız", BG: "Сладки изкушения", GR: "Γλυκές απολαύσεις" },
    items: [
      { name: { TR: "Magnolya", BG: "Magnolya", GR: "Magnolya" }, desc: { TR: "Çilekli ev yapımı magnolya", BG: "Магнолия", GR: "Μανόλια" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=400&q=80" },
      { name: { TR: "Stella Cup", BG: "Stella Cup", GR: "Stella Cup" }, desc: { TR: "Özel şef kupası", BG: "Стела Купа", GR: "Stella Cup" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=400&q=80" },
      { name: { TR: "Sufle", BG: "Sufle", GR: "Sufle" }, desc: { TR: "Akışkan çikolatalı sıcak sufle", BG: "Суфле", GR: "Σουφλέ" }, price: "250 ₺", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80" },
      { name: { TR: "Frambuazlı Cheesecake", BG: "Frambuazlı Cheesecake", GR: "Frambuazlı Cheesecake" }, desc: { TR: "Taze frambuaz soslu", BG: "Малинов чийзкейк", GR: "Cheesecake βατόμουρο" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80" },
      { name: { TR: "Limonlu Cheesecake", BG: "Limonlu Cheesecake", GR: "Limonlu Cheesecake" }, desc: { TR: "Ferahlatıcı limonlu", BG: "Лимонов чийзкейк", GR: "Cheesecake λεμόνι" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80" },
      { name: { TR: "Tiramisu", BG: "Tiramisu", GR: "Tiramisu" }, desc: { TR: "Orijinal İtalyan tiramisu", BG: "Тирамису", GR: "Τιραμισού" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=80" },
      { name: { TR: "Devil's", BG: "Devil's", GR: "Devil's" }, desc: { TR: "Yoğun çikolatalı ıslak kek", BG: "Шоколадова торта", GR: "Σοκολατόπιτα" }, price: "300 ₺", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80" },
      { name: { TR: "Waffle", BG: "Waffle", GR: "Waffle" }, desc: { TR: "Bol meyveli Belçika waffle", BG: "Гофрета", GR: "Βάφλα" }, price: "300 ₺", img: "https://images.unsplash.com/photo-1562376552-0d160a2f9fa4?w=400&q=80" },
      { name: { TR: "Waffle Salata Kase", BG: "Waffle Salata Kase", GR: "Waffle Salata Kase" }, desc: { TR: "Meyve şöleni waffle kasesinde", BG: "Гофретена купа", GR: "Μπολ βάφλας" }, price: "300 ₺", img: "https://images.unsplash.com/photo-1562376552-0d160a2f9fa4?w=400&q=80" },
      { name: { TR: "Dondurma Porsiyon", BG: "Dondurma", GR: "Dondurma" }, desc: { TR: "3 top dondurma porsiyonu", BG: "Сладолед", GR: "Παγωτό" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=400&q=80" },
      { name: { TR: "Dondurma (1 Top)", BG: "Dondurma (1 Top)", GR: "Dondurma (1 Top)" }, desc: { TR: "Seçmeli tek top", BG: "Топка сладолед", GR: "Μπάλα παγωτό" }, price: "40 ₺", img: "https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=400&q=80" },
      { name: { TR: "San Sebastian", BG: "San Sebastian", GR: "San Sebastian" }, desc: { TR: "Karamelize San Sebastian", BG: "Сан Себастиан", GR: "San Sebastian" }, price: "250 ₺", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80" },
    ]
  },
  {
    id: "hot_drinks",
    title: { TR: "Sıcak İçecekler", BG: "Топли Напитки", GR: "Ζεστά Ροφήματα" },
    subtitle: { TR: "İçinizi ısıtacak çay ve kahveler", BG: "Чай и кафе", GR: "Τσάι και καφές" },
    items: [
      { name: { TR: "Çay", BG: "Çay", GR: "Çay" }, desc: { TR: "İnce belli bardakta", BG: "Чай", GR: "Τσάι" }, price: "25 ₺", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
      { name: { TR: "Fincan Çay", BG: "Fincan Çay", GR: "Fincan Çay" }, desc: { TR: "Büyük fincan", BG: "Голям чай", GR: "Μεγάλο τσάι" }, price: "40 ₺", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
      { name: { TR: "Fincan Oralet Çayları", BG: "Fincan Oralet", GR: "Fincan Oralet" }, desc: { TR: "Çeşitli meyve aromalı", BG: "Плодов чай", GR: "Φρουτώδες τσάι" }, price: "50 ₺", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
      { name: { TR: "Bardak Oralet Çayları", BG: "Bardak Oralet", GR: "Bardak Oralet" }, desc: { TR: "İnce belli bardakta oralet", BG: "Малък плодов чай", GR: "Μικρό φρουτώδες τσάι" }, price: "35 ₺", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
      { name: { TR: "Bitki Çayları", BG: "Bitki Çayları", GR: "Bitki Çayları" }, desc: { TR: "Doğal bitki çayları", BG: "Билков чай", GR: "Βοτανικό τσάι" }, price: "140 ₺", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
      { name: { TR: "Süt", BG: "Süt", GR: "Süt" }, desc: { TR: "Sıcak süt", BG: "Топло мляко", GR: "Ζεστό γάλα" }, price: "100 ₺", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80" },
      { name: { TR: "Salep", BG: "Salep", GR: "Salep" }, desc: { TR: "Tarçınlı sıcak salep", BG: "Салеп", GR: "Σαλέπι" }, price: "140 ₺", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80" },
      { name: { TR: "Damla Sakızlı Salep", BG: "Damla Sakızlı Salep", GR: "Damla Sakızlı Salep" }, desc: { TR: "Özel damla sakızlı salep", BG: "Салеп с мастика", GR: "Σαλέπι με μαστίχα" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80" },
      { name: { TR: "Nescafe Sade", BG: "Nescafe Sade", GR: "Nescafe Sade" }, desc: { TR: "Sıcak granül kahve", BG: "Нескафе", GR: "Νεσκαφέ" }, price: "130 ₺", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80" },
      { name: { TR: "Sütlü Nescafe", BG: "Sütlü Nescafe", GR: "Sütlü Nescafe" }, desc: { TR: "Sütlü granül kahve", BG: "Нескафе с мляко", GR: "Νεσκαφέ με γάλα" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80" },
    ]
  },
  {
    id: "turkish_coffee",
    title: { TR: "Kumda Türk Kahveleri", BG: "Турско Кафе", GR: "Τουρκικός Καφές" },
    subtitle: { TR: "Geleneksel kumda pişirim", BG: "Традиционно приготвено", GR: "Παραδοσιακά φτιαγμένος" },
    items: [
      { name: { TR: "Türk Kahvesi", BG: "Türk Kahvesi", GR: "Türk Kahvesi" }, desc: { TR: "Klasik kumda Türk kahvesi", BG: "Турско кафе", GR: "Τουρκικός καφές" }, price: "70 ₺", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
      { name: { TR: "Double Türk Kahvesi", BG: "Double Türk Kahvesi", GR: "Double Türk Kahvesi" }, desc: { TR: "Duble porsiyon", BG: "Двойно турско кафе", GR: "Διπλός τουρκικός καφές" }, price: "120 ₺", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
      { name: { TR: "Sütlü Türk Kahvesi", BG: "Sütlü Türk Kahvesi", GR: "Sütlü Türk Kahvesi" }, desc: { TR: "Yumuşak içimli sütlü kahve", BG: "Турско кафе с мляко", GR: "Τουρκικός καφές με γάλα" }, price: "80 ₺", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
      { name: { TR: "Double Sütlü Türk Kahvesi", BG: "Double Sütlü Türk Kahvesi", GR: "Double Sütlü Türk Kahvesi" }, desc: { TR: "Duble sütlü Türk kahvesi", BG: "Двойно с мляко", GR: "Διπλός με γάλα" }, price: "130 ₺", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
      { name: { TR: "Damla Sakızlı Türk Kahvesi", BG: "Damla Sakızlı Türk Kahvesi", GR: "Damla Sakızlı Türk Kahvesi" }, desc: { TR: "Ege damla sakızlı", BG: "С мастика", GR: "Με μαστίχα" }, price: "80 ₺", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
      { name: { TR: "Menengiç Türk Kahvesi", BG: "Menengiç", GR: "Menengiç" }, desc: { TR: "Güneydoğu menengiç kahvesi", BG: "Кафе от шамфъстък", GR: "Καφές από φιστίκι" }, price: "80 ₺", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
      { name: { TR: "Dibek Kahvesi", BG: "Dibek Kahvesi", GR: "Dibek Kahvesi" }, desc: { TR: "Geleneksel dibek kahvesi", BG: "Кафе Дибек", GR: "Καφές Dibek" }, price: "80 ₺", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
    ]
  },
  {
    id: "espresso",
    title: { TR: "Espresso Bazlı Kahveler", BG: "Еспресо Напитки", GR: "Ροφήματα Εσπρέσο" },
    subtitle: { TR: "Dünya kahveleri", BG: "Световни кафета", GR: "Παγκόσμιοι καφέδες" },
    items: [
      { name: { TR: "Espresso", BG: "Espresso", GR: "Espresso" }, desc: { TR: "Tek shot espresso", BG: "Еспресо", GR: "Εσπρέσο" }, price: "80 ₺", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80" },
      { name: { TR: "Double Espresso", BG: "Double Espresso", GR: "Double Espresso" }, desc: { TR: "Çift shot espresso", BG: "Двойно Еспресо", GR: "Διπλός Εσπρέσο" }, price: "120 ₺", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80" },
      { name: { TR: "Matcha Latte", BG: "Matcha Latte", GR: "Matcha Latte" }, desc: { TR: "Sıcak matcha yeşil çay latte", BG: "Мача Лате", GR: "Matcha Latte" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80" },
      { name: { TR: "Americano", BG: "Americano", GR: "Americano" }, desc: { TR: "Sıcak su ile inceltilmiş espresso", BG: "Американо", GR: "Αμερικάνο" }, price: "120 ₺", img: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&q=80" },
      { name: { TR: "Cappuccino", BG: "Cappuccino", GR: "Cappuccino" }, desc: { TR: "Bol süt köpüklü espresso", BG: "Капучино", GR: "Καπουτσίνο" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80" },
      { name: { TR: "Coffee Latte", BG: "Coffee Latte", GR: "Coffee Latte" }, desc: { TR: "Sıcak sütlü hafif espresso", BG: "Кафе Лате", GR: "Καφέ Λάτε" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80" },
      { name: { TR: "Coffee Mocha", BG: "Coffee Mocha", GR: "Coffee Mocha" }, desc: { TR: "Çikolatalı espresso ve süt", BG: "Кафе Мока", GR: "Καφέ Μόκα" }, price: "160 ₺", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80" },
      { name: { TR: "White Chocolate Mocha", BG: "White Chocolate Mocha", GR: "White Chocolate Mocha" }, desc: { TR: "Beyaz çikolatalı espresso ve süt", BG: "Бяла Мока", GR: "Λευκή Μόκα" }, price: "160 ₺", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80" },
      { name: { TR: "Latte Macchiato", BG: "Latte Macchiato", GR: "Latte Macchiato" }, desc: { TR: "Katmanlı latte", BG: "Лате Макиато", GR: "Λάτε Μακιάτο" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80" },
      { name: { TR: "Caramel Latte Macchiato", BG: "Caramel Latte Macchiato", GR: "Caramel Latte Macchiato" }, desc: { TR: "Karamel şuruplu latte macchiato", BG: "Карамел Макиато", GR: "Καραμέλ Μακιάτο" }, price: "160 ₺", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80" },
      { name: { TR: "Affogato", BG: "Affogato", GR: "Affogato" }, desc: { TR: "Vanilyalı dondurma üzerine espresso", BG: "Афогато", GR: "Αφογκάτο" }, price: "180 ₺", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80" },
      { name: { TR: "Filtre Kahve", BG: "Filtre Kahve", GR: "Filtre Kahve" }, desc: { TR: "Taze demlenmiş filtre kahve", BG: "Филтър Кафе", GR: "Καφές Φίλτρου" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=80" },
    ]
  },
  {
    id: "hot_choco",
    title: { TR: "Sıcak Çikolatalar", BG: "Горещ Шоколад", GR: "Ζεστή Σοκολάτα" },
    subtitle: { TR: "Kış aylarının vazgeçilmezi", BG: "За студените дни", GR: "Για τις κρύες μέρες" },
    items: [
      { name: { TR: "Sıcak Çikolata", BG: "Sıcak Çikolata", GR: "Sıcak Çikolata" }, desc: { TR: "Klasik yoğun sıcak çikolata", BG: "Горещ шоколад", GR: "Ζεστή σοκολάτα" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80" },
      { name: { TR: "Beyaz Sıcak Çikolata", BG: "Beyaz Sıcak Çikolata", GR: "Beyaz Sıcak Çikolata" }, desc: { TR: "Tatlı beyaz çikolata", BG: "Бял горещ шоколад", GR: "Λευκή ζεστή σοκολάτα" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80" },
      { name: { TR: "Çilekli Sıcak Çikolata", BG: "Çilekli Sıcak Çikolata", GR: "Çilekli Sıcak Çikolata" }, desc: { TR: "Çilek aromalı", BG: "Ягодов горещ шоколад", GR: "Ζεστή σοκολάτα φράουλα" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80" },
      { name: { TR: "Fındıklı Sıcak Çikolata", BG: "Fındıklı Sıcak Çikolata", GR: "Fındıklı Sıcak Çikolata" }, desc: { TR: "Fındık aromalı", BG: "С лешници", GR: "Με φουντούκι" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80" },
      { name: { TR: "Karamelli Sıcak Çikolata", BG: "Karamelli Sıcak Çikolata", GR: "Karamelli Sıcak Çikolata" }, desc: { TR: "Karamel aromalı", BG: "С карамел", GR: "Με καραμέλα" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80" },
      { name: { TR: "Muzlu Sıcak Çikolata", BG: "Muzlu Sıcak Çikolata", GR: "Muzlu Sıcak Çikolata" }, desc: { TR: "Muz aromalı sıcak çikolata", BG: "С банан", GR: "Με μπανάνα" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80" },
    ]
  },
  {
    id: "cold_coffee",
    title: { TR: "Soğuk Kahveler", BG: "Студени Кафета", GR: "Κρύοι Καφέδες" },
    subtitle: { TR: "Buz gibi serinletici", BG: "Освежаващи", GR: "Δροσιστικά" },
    items: [
      { name: { TR: "Ice Latte", BG: "Ice Latte", GR: "Ice Latte" }, desc: { TR: "Buzlu sütlü espresso", BG: "Айс Лате", GR: "Ice Latte" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80" },
      { name: { TR: "Ice Mocha", BG: "Ice Mocha", GR: "Ice Mocha" }, desc: { TR: "Buzlu çikolatalı latte", BG: "Айс Мока", GR: "Ice Mocha" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80" },
      { name: { TR: "Ice White Mocha", BG: "Ice White Mocha", GR: "Ice White Mocha" }, desc: { TR: "Buzlu beyaz çikolatalı latte", BG: "Айс Бяла Мока", GR: "Ice White Mocha" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80" },
      { name: { TR: "Ice Americano", BG: "Ice Americano", GR: "Ice Americano" }, desc: { TR: "Buzlu sade kahve", BG: "Айс Американо", GR: "Ice Americano" }, price: "130 ₺", img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&q=80" },
      { name: { TR: "Ice Orange Latte", BG: "Ice Orange Latte", GR: "Ice Orange Latte" }, desc: { TR: "Portakal aromalı buzlu latte", BG: "Портокалово Лате", GR: "Ice Orange Latte" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80" },
      { name: { TR: "Ice Mango Latte", BG: "Ice Mango Latte", GR: "Ice Mango Latte" }, desc: { TR: "Mango aromalı buzlu latte", BG: "Манго Лате", GR: "Ice Mango Latte" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80" },
    ]
  },
  {
    id: "frappe",
    title: { TR: "Frappeler", BG: "Фрапета", GR: "Φραπέ" },
    subtitle: { TR: "Buz gibi karışımlar", BG: "Студени смеси", GR: "Παγωμένα μείγματα" },
    items: [
      { name: { TR: "Frappe", BG: "Frappe", GR: "Frappe" }, desc: { TR: "Klasik yunan frappe", BG: "Фрапе", GR: "Φραπέ" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&q=80" },
      { name: { TR: "Karamel Frappe", BG: "Karamel Frappe", GR: "Karamel Frappe" }, desc: { TR: "Karamelli frappe", BG: "Карамел Фрапе", GR: "Φραπέ Καραμέλα" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&q=80" },
      { name: { TR: "Çikolatalı Frappe", BG: "Çikolatalı Frappe", GR: "Çikolatalı Frappe" }, desc: { TR: "Çikolatalı frappe", BG: "Шоколадово Фрапе", GR: "Φραπέ Σοκολάτα" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&q=80" },
      { name: { TR: "Vanilyalı Frappe", BG: "Vanilyalı Frappe", GR: "Vanilyalı Frappe" }, desc: { TR: "Vanilyalı frappe", BG: "Ванилово Фрапе", GR: "Φραπέ Βανίλια" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&q=80" },
      { name: { TR: "Fındıklı Frappe", BG: "Fındıklı Frappe", GR: "Fındıklı Frappe" }, desc: { TR: "Fındıklı frappe", BG: "Лешниково Фрапе", GR: "Φραπέ Φουντούκι" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&q=80" },
    ]
  },
  {
    id: "cold_drinks",
    title: { TR: "Soğuk İçecekler & Frozen", BG: "Студени Напитки", GR: "Κρύα Ποτά" },
    subtitle: { TR: "Limonata, Milkshake, Smoothie", BG: "Освежаващи напитки", GR: "Δροσιστικά ροφήματα" },
    items: [
      { name: { TR: "Smoothie Çeşitleri", BG: "Smoothie", GR: "Smoothie" }, desc: { TR: "Çilek, Karadut, Kavun, Kivi, Muz", BG: "Плодово смути", GR: "Smoothie φρούτων" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&q=80" },
      { name: { TR: "Milkshake Çeşitleri", BG: "Milkshake", GR: "Milkshake" }, desc: { TR: "Çilek, Çikolata, Vanilya, Karamel, Muz, Oreo", BG: "Млечен шейк", GR: "Μιλκσέικ" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80" },
      { name: { TR: "Frozen Çeşitleri", BG: "Frozen", GR: "Frozen" }, desc: { TR: "Çilek, Elma, Kivi, Karpuz, Nane-Limon, Kavun", BG: "Фроузън", GR: "Frozen" }, price: "170 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Blue Vanilla", BG: "Blue Vanilla", GR: "Blue Vanilla" }, desc: { TR: "Special Soğuk İçecek", BG: "Специална напитка", GR: "Special Drink" }, price: "175 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Green Life", BG: "Green Life", GR: "Green Life" }, desc: { TR: "Special Soğuk İçecek", BG: "Специална напитка", GR: "Special Drink" }, price: "175 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Ice Matcha Latte - Strawberry", BG: "Matcha Strawberry", GR: "Matcha Strawberry" }, desc: { TR: "Çilekli buzlu matcha", BG: "Мача с ягода", GR: "Matcha φράουλα" }, price: "200 ₺", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80" },
      { name: { TR: "Ice Black Honey", BG: "Ice Black Honey", GR: "Ice Black Honey" }, desc: { TR: "Özel ballı soğuk içecek", BG: "Студена напитка с мед", GR: "Κρύο ποτό με μέλι" }, price: "175 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Rainbow", BG: "Rainbow", GR: "Rainbow" }, desc: { TR: "Special Soğuk İçecek", BG: "Специална напитка", GR: "Special Drink" }, price: "175 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Mojito (Çilek / Elma)", BG: "Mojito", GR: "Mojito" }, desc: { TR: "Ferahlatıcı alkolsüz mojito", BG: "Мохито", GR: "Μοχίτο" }, price: "175 ₺", img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80" },
      { name: { TR: "Stella Drink", BG: "Stella Drink", GR: "Stella Drink" }, desc: { TR: "Stella'ya özel spesiyal", BG: "Спесиал", GR: "Special" }, price: "175 ₺", img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80" },
      { name: { TR: "Cola / Fruko / Yedigün / Ice Tea", BG: "Meşrubat", GR: "Meşrubat" }, desc: { TR: "Kutu meşrubatlar", BG: "Безалкохолни", GR: "Αναψυκτικά" }, price: "75 ₺", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
      { name: { TR: "Enerji İçeceği", BG: "Enerji İçeceği", GR: "Enerji İçeceği" }, desc: { TR: "Kutu enerji içeceği", BG: "Енергийна напитка", GR: "Ενεργειακό ποτό" }, price: "125 ₺", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
      { name: { TR: "Limonata (Klasik)", BG: "Limonata", GR: "Limonata" }, desc: { TR: "Ev yapımı limonata", BG: "Лимонада", GR: "Λεμονάδα" }, price: "75 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Limonata (Çilekli / Naneli)", BG: "Aromalı Limonata", GR: "Aromalı Limonata" }, desc: { TR: "Çilekli veya naneli limonata", BG: "Плодова лимонада", GR: "Φρουτώδης λεμονάδα" }, price: "90 ₺", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
      { name: { TR: "Sıkma Portakal Suyu", BG: "Portakal Suyu", GR: "Portakal Suyu" }, desc: { TR: "Taze sıkılmış", BG: "Портокалов сок", GR: "Χυμός πορτοκάλι" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80" },
      { name: { TR: "Sıkma Nar Suyu", BG: "Nar Suyu", GR: "Nar Suyu" }, desc: { TR: "Taze sıkılmış nar suyu", BG: "Сок от нар", GR: "Χυμός ρόδι" }, price: "150 ₺", img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80" },
    ]
  }
];
