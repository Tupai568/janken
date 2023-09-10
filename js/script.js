class SeleksiDom {
  constructor(Seleksi, SeleksiAll, SeleksiTag, second) {
    this.Seleksi = document.querySelector(Seleksi);
    this.SeleksiAll = document.querySelectorAll(SeleksiAll);
    this.SeleksiTag = document.getElementsByTagName(SeleksiTag);
    this.Second = second;
  }

  //Menampilkan Isi Didalam HtmlColection
  Play(callback) {
    for (let i = 0; i < this.SeleksiAll.length; i++) {
      callback(this.SeleksiAll[i]);
    }
  }

  //Mendapatkan Hasil Pilihan Computer Dengan Mengacak Angka
  Computer(max, min) {
    const Rand = Math.floor(Math.random() * (max - min + 1)) + min;
    if (Rand <= 3) return "Batu";
    if (Rand <= 6) return "Gunting";
    return "Kertas";
  }

  //Mendapatkan Hasil Tanding
  Hasil(Text) {
    let Manusia = Text;
    let Robot = this.Computer(0, 10);
    if (Manusia == Robot) return `${Manusia}, Draw`;
    if (Manusia == "Batu")
      return Robot == "Gunting" ? "Gunting,You Win" : "Kertas,You Lose";
    if (Manusia == "Gunting")
      return Robot == "Kertas" ? "Kertas,You Win" : "Batu,You Lose";
    if (Manusia == "Kertas")
      return Robot == "Batu" ? "Batu,You Win" : "Gunting,You Lose";
  }

  //Memberi Waktu Tunggu
  Waktu(waktu) {
    const stard = setInterval(() => {
      waktu();
      if (this.Second < 0) {
        clearInterval(stard);
      }
    }, 500);
  }
}

const Seleksi = new SeleksiDom(".player", ".gambar", "button", 3);
const Com = new SeleksiDom(".player", ".gambarcom", "button");

 //Jika Tombol Button Di Klick Maka Jalankan
Seleksi.SeleksiTag[0].addEventListener("click", () => { 
  Seleksi.SeleksiTag[0].disabled = true; //disable tombol button
  Seleksi.SeleksiTag[0].innerHTML = `Pilih `; //Ubah Text
  Com.Play((elment) => {  //simpan yang ada di callback kedalam variable element
    elment.style.opacity = 1; //Ganti Opacity Pada Setiap Element Computer
  });

  Seleksi.Play((elment) => {  //simpan yang ada di callback kedalam variable element
    elment.style.opacity = 1; //Ganti Opacity Pada Setiap Element Player
    elment.addEventListener("click", () => {
      //Jika Salah Satu Element Diclick Maka Jalankan
      Seleksi.SeleksiTag[0].innerHTML = `Go`; //Ubah Text
      Seleksi.Play((elements) => {
        //Jika Tombol Sudah Di Click Maka Semua Gambar Disabled
        elements.classList.add("disab"); //Tambah Class disab
      });

      elment.style.transform = "scale(1.5)"; //Ganti Transform Scale
      const Pilihan = elment.className.split(" "); //Merubah String Menjadi Array
      const Result = Seleksi.Hasil(Pilihan[1]).split(","); //Merubah String Menjadi Array
      //Memberikan Waktu Pada Hasil Yang Akan Keluar
      Seleksi.Waktu(() => {
        //Menjalankan Function Waktu
        Seleksi.SeleksiTag[0].innerHTML = `${Seleksi.Second} `; //Merubah Text Dengan Result Dari Fungctio Waktu
        Seleksi.Second--; //Mengurangi Waktu
        if (Seleksi.Second < 0) {
          //Kondisi Jika Waktu Sama Dengan 0
          Seleksi.SeleksiTag[0].innerHTML = `${Result[1]} `; //Mengambil Hasil Dari Array Dengan Index 1
          Seleksi.SeleksiTag[0].style.width = "7rem"; //Merubah Css
          Com.Play((elment) => {
            //Menjalankan Perulangan Computer
            const p = elment.src.split("/"); //Mengambil Src Dari Gambar HTML, Lalu Merubahnya Menjadi Array Dengan Pemisah /
            const pOne = p[5].split("."); //Mengambil Data Dari Variable p Dengan Index 4,  Lalu Merubahnya Menjadi Array Dengan Pemisah .
            if (pOne[0] == Result[0].toLowerCase()) {
              elment.style.transform = "rotate(180deg) scale(1.5)";
            }
          });

          //Mulai Ulang
          Seleksi.SeleksiTag[1].style.display = "block"; //Merubah Display Menjadi Block
          Seleksi.SeleksiTag[1].addEventListener("click", () => {
            //Kondisi Jika Tombol Di Klick
            // Seleksi.SeleksiTag[0].disabled = false;  //Kembalikan Tombol Button
            Seleksi.SeleksiTag[0].innerHTML = `Pilih `; //Ganti Text Tombol Button
            Seleksi.Second = 3; //Kembalikan Angka Menjadi 3
            Seleksi.SeleksiTag[1].style.display = "none"; //Ubah DIsplay MEnjadi None

            //Computer
            Com.Play((elment) => {
              //Ubah Semua Element Computer
              elment.style.transform = "rotate(180deg) scale(1)";
            });

            //Player
            Seleksi.Play((elment) => {
              //Ubah Semua Element Player
              elment.style.transform = "scale(1)";
              elment.classList.remove("disab");
            });
          });
        }
      });
    });
  });
});
