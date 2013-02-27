/**
 * @name jQuery modal (https://github.com/jgarber623/jquery-modal)
 * @author Jason Garber
 * @copyright (cc) Jason Garber (http://sixtwothree.org and http://www.viget.com)
 *
 * Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
 */

;(function( $, window, document, undefined ) {
	
	var Modal = function( markup, options ) {
		this.$markup = $( markup );
		this.options = options;
		
		this.init();
	};
	
	Modal.prototype = {
		defaults: {
			animationDuration: 250,
			callbacks: {
				post: function() {},
				pre: function() {}
			},
			classes: {
				closeButton: 'modal-close-button',
				contentWrapper: 'modal-content-wrapper',
				curtain: 'modal-curtain',
				loaded: 'modal-loaded'
			}
		},
		
		init: function() {
			this.config = $.extend( {}, this.defaults, this.options );
			
			this.$body = $( 'body' );
			this.$closeButton = $( '<button class="' + this.config.classes.closeButton + '" type="button">Close</button>' );
			this.$curtain = $( '<div class="' + this.config.classes.curtain + '" />' );
			this.$elem = $( '<div class="' + this.config.classes.contentWrapper + '" />' );
			this.$window = $( 'window' );
			
			this.$elem.append( this.$markup.clone( true ), this.$closeButton );
			
			this.events.bind();
			
			return this;
		},
		
		events: {
			bind: function() {
				this.$closeButton.add( this.$curtain ).on( 'click.modal', this.handlers.click );
				
				this.$window.on( 'keyup.modal', this.handlers.keyup );
			},
			
			unbind: function() {
				this.$closeButton.add( this.$curtain ).off( 'click.modal' );
				
				this.$window.off( 'keyup.modal' );
			}
		},
		
		handlers: {
			click: function( event ) {
				event.preventDefault();
				
				this.hide();
			},
			
			keyup: function( event ) {
				event.preventDefault();
				
				if ( event.which == 27 ) {
					this.hide();
				}
			}
		},
		
		hide: function() {
			this.$curtain.add( this.$elem ).removeClass( this.config.classes.loaded );
			
			var timeout = setTimeout( $.proxy( function() {
				this.handlers.unbind();
				
				this.$curtain.add( this.$elem ).remove();
				
				if ( typeof this.config.callbacks.post == 'function' ) {
					this.config.callbacks.post();
				}
			}, this ), this.config.animationDuration );
		},
		
		show: function() {
			if ( typeof this.config.callbacks.pre == 'function' ) {
				this.config.callbacks.pre();
			}
			
			this.$body.append( this.$curtain, this.$elem );
			
			this.$elem.css( 'top', this.$window.scrollTop() + Math.floor( ( this.$window.outerHeight() - this.$elem.outerHeight() ) / 2 ) );
			
			this.$curtain.add( this.$elem ).addClass( this.config.classes.loaded );
		}
	};
	
	window.Modal = Modal;
	
})( jQuery, window, document );