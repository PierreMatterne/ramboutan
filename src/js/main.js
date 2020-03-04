/* jshint esversion: 6 */


// COMPONENTS
Vue.component('name-of-it',{
	props: ['todo'],
	template: '<li>Loriste {{todo.text}}</li>'
});









var app = new Vue({
	el: '#app',
	data: {
		message: 'You loaded this page on ' + new Date().toLocaleString(),
		currentPage : "albums",
		currentAlbum : "xyz",
		maskActive : false,
		currentPhotoUrl : '',
		currentTheme : 'themeLight'
	},

	created(){
		this.albums = albums; 
		this.photos = photos;
	},

	methods: {
		setThemeRight: function(theme){
			this.currentTheme = theme;
		},

		openAlbum : function(aName){
			this.message = "J'ouvre l'album " + aName;
			this.currentPage = "album";
			this.currentAlbum = aName;
		},

		openPhoto : function(anId){
			this.message = "J'affiche la photo " + anId;
			document.getElementById('mask').classList.add('active');
			// Remplaçable par un v-if ou v-show ? avec transition ?
			this.currentPhotoUrl = getUrlFromId(anId) ;

		},

		unMask : function(){
			document.getElementById('mask').classList.remove('active');
		}
	},

	computed: {
		getBackground(){
			return 'background: url('+this.currentPhotoUrl+') no-repeat center/contain;';
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

