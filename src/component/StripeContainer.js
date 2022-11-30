import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51M8RIcEmIUTHssjBce9mIEb2VZk2yLnKQkMOinm6aJjK34B0F9uFN3oDGo6HEj1jnfylNz6f2eZGK2P8bEjLDNyy00li9rZFqL"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm unmount={props.unmount} cantidad={props.cantidad} identificador_externo={props.identificador_externo} nombres={props.nombres} apellidos={props.apellidos}/>
		</Elements>
	)
}
