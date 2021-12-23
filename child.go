package main

import (
	"io/ioutil"
	"os"
)

func main() {
	// Emite la señal "preparado"
	os.Stdout.WriteString("ready")

	// Espera a la respuesta
	raw, err := ioutil.ReadAll(os.Stdin)
	msg := string(raw)

	// Evalúa el contenido de err.
	if err != nil {
		// Si se producen errores de lectura, lo emite por stderr.
		os.Stderr.WriteString(err.Error())

	} else {
		// Continúa con el flujo normal.

		// Esto es una simple muestra para que se entienda el uso del stdout.
		if msg == "0001" {
			os.Stdout.WriteString("1")

		} else if msg == "0010" {
			os.Stdout.WriteString("2")

		}
	}
}
