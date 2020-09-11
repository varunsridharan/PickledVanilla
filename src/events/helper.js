import { eventsFocus, eventsHover, eventsNamespace, eventsNamespacesSeparator, some } from "../core/vars";

export function removeEvent( ele, name, namespaces, selector, callback ) {
	const cache = getEventsCache( ele );
	if( !name ) {

		for( name in cache ) {
			removeEvent( ele, name, namespaces, selector, callback );
		}

	} else if( cache[ name ] ) {
		cache[ name ] = cache[ name ].filter( ( [ ns, sel, cb ] ) => {
			if( ( callback && cb.guid !== callback.guid ) || !hasNamespaces( ns, namespaces ) || ( selector && selector !== sel ) ) {
				return true;
			}
			ele.removeEventListener( name, cb );
		} );
	}
}

export function parseEventName( eventName ) {
	const parts = eventName.split( eventsNamespacesSeparator );
	return [ parts[ 0 ], parts.slice( 1 ).sort() ];
	// [name, namespace[]]
}

export function hasNamespaces( ns1, ns2 ) {
	return !ns2 || !some.call( ns2, ( ns ) => ns1.indexOf( ns ) < 0 );
}

export function getEventsCache( ele ) {
	return ele[ eventsNamespace ] = ( ele[ eventsNamespace ] || {} );
}

export function getEventNameBubbling( name ) {
	return eventsHover[ name ] || eventsFocus[ name ] || name;
}

export function addEvent( ele, name, namespaces, selector, callback ) {
	const eventCache   = getEventsCache( ele );
	eventCache[ name ] = ( eventCache[ name ] || [] );
	eventCache[ name ].push( [ namespaces, selector, callback ] );
	ele.addEventListener( name, callback );
}