class Music {
    constructor (title,singer,img,file) {
        this.title=title;
        this.singer=singer;
        this.img=img;
        this.file=file;
    }

    getName(){
        return this.singer+ " - "+ this.title;  
    }
}


const musicList = [
    new Music("Ah Nerede","Füsun Onal","ahNerede.jpg","Ah Nerede.mp3"),
    new Music("Bim Bam Bom","Yasemin Kumral","bimbambom.jpg","Bim Bam Bom.mp3"),
    new Music("Gençlik Başımda Duman","Güzin & Baha","genclik.jpg","Gençlik Başımda Duman.mp3"),
]