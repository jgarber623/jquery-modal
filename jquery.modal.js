/**
 * @name jQuery modal (https://github.com/jgarber623/jquery-modal)
 * @author Jason Garber
 * @copyright (cc) Jason Garber (http://sixtwothree.org and http://www.viget.com)
 *
 * Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
 */

;(function( $, window, document, undefined ) {

	var m;

	var Modal = function( markup, options ) {
		m = this;

		m.$markup = $( markup );
		m.options = options;

		m.init();
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
			m.config = $.extend( {}, m.defaults, m.options );

			m.$body = $( 'body' );
			m.$closeButton = $( '<button class="' + m.config.classes.closeButton + '" type="button">Close</button>' );
			m.$curtain = $( '<div class="' + m.config.classes.curtain + '" />' );
			m.$elem = $( '<div class="' + m.config.classes.contentWrapper + '" />' );
			m.$window = $( window );

			m.$elem.append( m.$markup, m.$closeButton );

			m.events.attach();

			return m;
		},

		events: {
			attach: function() {
				m.$closeButton.add( m.$curtain ).on( 'click.modal', m.handlers.click );

				m.$window.on( 'keyup.modal', m.handlers.keyup );
			},

			detach: function() {
				m.$closeButton.add( m.$curtain ).off( 'click.modal' );

				m.$window.off( 'keyup.modal' );
			}
		},

		handlers: {
			click: function( event ) {
				event.preventDefault();

				m.hide();
			},

			keyup: function( event ) {
				event.preventDefault();

				if ( event.which == 27 ) {
					m.hide();
				}
			}
		},

		hide: function() {
			m.$curtain.add( m.$elem ).removeClass( m.config.classes.loaded );

			var timeout = setTimeout( function() {
				m.events.detach();

				m.$curtain.add( m.$elem ).remove();

				if ( typeof m.config.callbacks.post == 'function' ) {
					m.config.callbacks.post();
				}
			}, m.config.animationDuration );
		},

		show: function() {
			m.$body.append( m.$curtain, m.$elem );

			if ( typeof m.config.callbacks.pre == 'function' ) {
				m.config.callbacks.pre();
			}

			m.$elem.css( 'top', m.$window.scrollTop() + Math.floor( ( m.$window.outerHeight() - m.$elem.outerHeight() ) / 2 ) );

			m.$curtain.add( m.$elem ).addClass( m.config.classes.loaded );
		}
	};

	window.Modal = Modal;

})( jQuery, window, document );