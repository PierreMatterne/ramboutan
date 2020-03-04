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
		modalThemeOpened: false
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
		},

		openPhoto : function(anId){
			document.getElementById('mask').classList.add('active');
			// Remplaçable par un v-if ou v-show ? avec transition ?
			this.currentPhotoUrl = getUrlFromId(anId) ;

		},

		unMask : function(){
			document.getElementById('mask').classList.remove('active');
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
	console.log("ok");
	for (let photo of app.photos){
		if (photo.id === id){ return 'medias/' + photo.filename;}
	}
	return '';
}

