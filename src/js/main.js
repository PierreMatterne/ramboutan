/* jshint esversion: 6 */




var app = new Vue({
	el: '#app',
	data: {
		message: 'You loaded this page on ' + new Date().toLocaleString(),
		currentPage : "pageAlbums",
		currentAlbum : "xyz",
		maskActive : false,
		currentPhotoUrl : '',
		currentTheme : 'themeLight',
		modalThemeOpened: false,
		displayInfoPanel: false,
		currentPhotoInfos: {}
	},

	created(){
		this.albums = albums; 
		this.photos = photos;
	},

	methods: {
		setThemeRight: function(theme){
			this.currentTheme = theme;
			this.modalThemeOpened = false;
		},

		openAlbum : function(aName){
			this.currentPage = "pagePhotos";
			this.currentAlbum = aName;
		},

		getBackToAlbums : function(){
			this.currentPage = "pageAlbums";
			// désactiver les images ouvertes
		},

		openPhoto : function(anId){
			document.getElementById('mask').classList.add('active');
			// Remplaçable par un v-if ou v-show ? avec transition ?
			this.currentPhotoUrl = getUrlFromId(anId) ;
			let	width = window.innerWidth || document.body.clientWidth;
			let height = window.innerHeight || document.body.clientHeight;

			console.log(width , height);

			document.getElementById('thePicture').style.maxWidth=width-30 + 'px';
			document.getElementById('thePicture').style.maxHeight=height-200 + 'px';

			this.currentPhotoInfos = getAllinfos(anId);

		},

		unMask : function(){
			document.getElementById('mask').classList.remove('active');
			// Remplacer la ligne ci-dessus par un v-show + animation.
			this.displayInfoPanel = false;
		},

		openModalTheme : function(){
			this.modalThemeOpened = true;
		}
	},

	computed: {
		getBackground(){
			return 'background: url('+this.currentPhotoUrl+') no-repeat center/contain;';
		},
		nbrAlbums(){
			return this.albums.length;
		}		
	}

}); 


// Pourquoi sortir cette fonction ?
function getUrlFromId(id){
	for (let photo of app.photos){
		if (photo.id === id){ return 'medias/' + photo.filename;}
	}
}

function getAllinfos(id){
	for (let photo of app.photos){
		if (photo.id === id){ return photo;}
	}
}
