import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OzgecmisSer} from '../../providers/ozgecmis-ser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

/*
  Generated class for the OzgecmisDetay page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ozgecmis-detay',
  templateUrl: 'ozgecmis-detay.html'
})
export class OzgecmisDetayPage {

  @ViewChild('fileInput') fileInput;
  resimUrl: string;
  resimCloudUrl: string;
  detay: any;
  detayList: any;
  des: string;
  basvurulist: any;
  kisiselFormGroup: FormGroup; iletisimFormGroup: FormGroup; tecrubeFormGroup: FormGroup; egitimFormGroup: FormGroup;
  sertifikaFormGroup: FormGroup; yabanciDilFormGroup: FormGroup; bilgisayarFormGroup: FormGroup;
  private imageSrc: string;
  sehirler = [
    {"sehir":"İstanbul"},{"sehir":"Ankara"},{"sehir":"İzmir"},{"sehir":"Adana"},{"sehir":"Adıyaman"},{"sehir":"Afyonkarahisar"}
   ,{"sehir":"Ağrı"},{"sehir":"Aksaray"},{"sehir":"Amasya"},{"sehir":"Antalya"},{"sehir":"Ardahan"},{"sehir":"Artvin"}
   ,{"sehir":"Aydın"},{"sehir":"Balıkesir"},{"sehir":"Bartın"},{"sehir":"Batman"},{"sehir":"Bayburt"},{"sehir":"Bilecik"}
   ,{"sehir":"Bingöl"},{"sehir":"Bitlis"},{"sehir":"Bolu"},{"sehir":"Burdur"},{"sehir":"Bursa"},{"sehir":"Çanakkale"},{"sehir":"Çankırı"}
   ,{"sehir":"Çorum"},{"sehir":"Denizli"},{"sehir":"Diyarbakır"},{"sehir":"Düzce"},{"sehir":"Edirne"},{"sehir":"Elazığ"}
   ,{"sehir":"Erzincan"},{"sehir":"Erzurum"},{"sehir":"Eskişehir"},{"sehir":"Gaziantep"},{"sehir":"Giresun"},{"sehir":"Gümüşhane"}
   ,{"sehir":"Hakkari"},{"sehir":"Hatay"},{"sehir":"Iğdır"},{"sehir":"Isparta"},{"sehir":"Kahramanmaraş"},{"sehir":"Karabük"}
   ,{"sehir":"Karaman"},{"sehir":"Kars"},{"sehir":"Kastamonu"},{"sehir":"Kayseri"},{"sehir":"Kırıkkale"},{"sehir":"Kırklareli"}
   ,{"sehir":"Kırşehir"},{"sehir":"Kilis"},{"sehir":"Kocaeli"},{"sehir":"Konya"},{"sehir":"Kütahya"},{"sehir":"Malatya"}
   ,{"sehir":"Manisa"},{"sehir":"Mardin"},{"sehir":"Mersin"},{"sehir":"Muğla"},{"sehir":"Muş"},{"sehir":"Nevşehir"}
   ,{"sehir":"Niğde"},{"sehir":"Ordu"},{"sehir":"Osmaniye"},{"sehir":"Rize"},{"sehir":"Sakarya"},{"sehir":"Samsun"}
   ,{"sehir":"Siirt"},{"sehir":"Sinop"},{"sehir":"Sivas"},{"sehir":"Şırnak"},{"sehir":"Tekirdağ"},{"sehir":"Tokat"}
   ,{"sehir":"Trabzon"},{"sehir":"Tunceli"},{"sehir":"Şanlıurfa"},{"sehir":"Uşak"},{"sehir":"Van"},{"sehir":"Yalova"}
   ,{"sehir":"Yozgat"},{"sehir":"Zonguldak"}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder, public ozgecmisSer: OzgecmisSer,
              public toastCtrl: ToastController, private camera: Camera,
              public storage: Storage, public events: Events) {

    this.detay = this.navParams.get('ozDetay');
    this.detayList = this.navParams.get('ozDetayList');
    this.basvurulist = this.navParams.get('basvurulist');
    if(this.detayList) console.log("oki");
    this.des = this.navParams.get('des');
    // this.detayClone = Object.assign({}, this.detay);
    this.kisiselFormGroup = formBuilder.group({
          isim: [this.detay.isim, [Validators.required]],
          dogumTarihi: [this.detay.dogumTarihi, [Validators.maxLength(30),Validators.required]],
          tc: [this.detay.tc, [Validators.maxLength(30),Validators.required]],
          // tc: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          askerlik: [this.detay.askerlik, [Validators.required]],
          medeni: [this.detay.medeni, [Validators.required]],
          ehliyet: [this.detay.ehliyet, [Validators.required]],
          egitimdurum: [this.detay.egitimdurum, [Validators.required]],
          unvan: [this.detay.unvan, [Validators.required]],
          yilTecrube: [this.detay.yilTecrube, [Validators.required]]
          // resim: [this.detay.resim==undefined ? this.detay.resim.profile : '', [Validators.required]]
        });
          //  Validators.pattern('[\(]\d{3}[\)]\d{7}')
  this.iletisimFormGroup = formBuilder.group({
          telefon: [this.detay.telefon, [Validators.required]],
          email: [this.detay.email, Validators.required],
          adres: [this.detay.adres, Validators.required],
          sehir: [this.detay.sehir, Validators.required]
        });

  this.tecrubeFormGroup = formBuilder.group({
          firma: [this.detay.firma, Validators.required],
          pozisyon: [this.detay.pozisyon, Validators.required],
          isTanimiKisa: [this.detay.isTanimiKisa, Validators.required],
          isTanimi: [this.detay.isTanimi, Validators.required],
          sehir: [this.detay.sehir, Validators.required],
          ulke: [this.detay.ulke, Validators.required],
          giris: [this.detay.giris, Validators.required],
          cikis: [this.detay.cikis]
        });

  this.egitimFormGroup = formBuilder.group({
          okul: [this.detay.okul, Validators.required],
          derece: [this.detay.derece, Validators.required],
          bolum: [this.detay.bolum],
          cikis: [this.detay.cikis, Validators.required],
          sehir: [this.detay.sehir, Validators.required],
          ulke: [this.detay.ulke, Validators.required]
        });

  this.yabanciDilFormGroup = formBuilder.group({
          dil: [this.detay.dil, Validators.required],
          seviye: [this.detay.seviye, Validators.required]
        });

  this.sertifikaFormGroup = formBuilder.group({
          ad: [this.detay.ad, Validators.required],
          kurum: [this.detay.kurum, Validators.required],
          cikis: [this.detay.cikis, Validators.required],
        });

  this.bilgisayarFormGroup = formBuilder.group({
          bilgisayar: [this.detay.bilgisayar, Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OzgecmisDetayPage');
  }

   openGallery (): void {
     if (Camera['installed']()) {

     const cameraOptions: CameraOptions = {
    // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    quality: 100,
    targetWidth: 100,
    targetHeight: 100,
    encodingType: this.camera.EncodingType.JPEG
    // correctOrientation: true
    // mediaType: this.camera.MediaType.PICTURE
  }

  // this.detay.resim.media = 'upload';
  this.camera.getPicture(cameraOptions)
    .then(file_uri => {
      this.detay.resim = 'data:image/jpg;base64,' + file_uri;

      // this.ozgecmisSer.updateAvatar('data:image/jpeg;base64,' + file_uri)
      // .then( (resUrl: any) => {
      //   this.detay.resim.link = resUrl.secure_url;
      //   console.log(resUrl);
      //   // console.log(resUrl.secure_url+'secure');
      // });
  },  (err) => console.log(err));
}

  else {
    this.fileInput.nativeElement.click();
  }
}

  save() {
    // console.log(JSON.stringify(this.detay)+'detaysavee');
    // console.log(JSON.stringify(this.detayList)+'detaysavelist');

    if(this.detayList) {
      console.log("resim update");
    this.des = this.des.replace("Ekle", "");
    this.ozgecmisSer.updateOzgecmis(this.des, this.detayList, this.basvurulist)
    .then((res) =>{
      console.log(JSON.stringify(this.basvurulist)+'detaylist');
      this.storage.set('ozgecmis', this.basvurulist);
      this.events.publish('ozgecmis:update');
      this.navCtrl.pop();

    } );

  }
  else {
    console.log("resim else");

    this.ozgecmisSer.updateOzgecmisAll(this.detay)
    .then((res) =>{
      console.log(JSON.stringify(this.detay)+'detaylist');
      this.events.publish('ozgecmis:update');
      this.storage.set('ozgecmis', this.detay);
      this.navCtrl.pop();
    } );
}
    // ozgecmisSer.updateOzgecmis()
  }

  delete() {
    console.log(JSON.stringify(this.detay)+'detay');
    this.des = this.des.replace('Ekle', '');
    if ((this.des == 'tecrube' || this.des == 'egitim') && Object.keys(this.detayList).length < 2) {
      this.presentToast("Son kayıt silinemez!");
      return;
    }
    let i = this.detayList.findIndex((item) => {
        return (item === this.detay ); });
    this.detayList.splice(i,1);
    this.ozgecmisSer.updateOzgecmis(this.des, this.detayList, this.basvurulist)
    .then((res) =>{
      console.log(JSON.stringify(this.basvurulist)+'detaylist');
      this.storage.set('ozgecmis', this.basvurulist)
      .then(res => this.navCtrl.pop() )

    } );
  }

  add() {
    console.log(JSON.stringify(this.detay)+'detay');
    this.detayList.push(this.detay);
    this.des = this.des.replace('Ekle', '');
    this.ozgecmisSer.updateOzgecmis(this.des, this.detayList, this.basvurulist)
      .then((res) =>{
        console.log(JSON.stringify(this.basvurulist)+'detaylist');
        this.storage.set('ozgecmis', this.basvurulist)
        .then(res => this.navCtrl.pop() )
      });
  }

butPressed(media: String){
  // this.detay.resim.media = media;
  // this.detay.resim.link = "https://avatars.io/"+this.detay.resim.media+"/"+this.detay.resim.profile;
  console.log("butPressed");
}

processWebImage(event) {
  let reader = new FileReader();
  // let dataUrl = undefined;
  reader.onload = (readerEvent) => {
    console.log("event");
    this.detay.resim = (readerEvent.target as any).result;
    // console.log(dataUrl);
    // console.log(dataUrl.length);
    this.resimCloudUrl = 'url(' + this.detay.resim + ')';

  };
  reader.readAsDataURL(event.target.files[0]);
  console.log(event.target.files[0]);

}

  presentToast(mesaj) {
  let toast = this.toastCtrl.create({
    message: mesaj,
    duration: 4000,
    position: 'top',
    showCloseButton: true,
    closeButtonText: 'OK'
  });
  toast.present();
}

}
