package main

import (
	"fmt"
	"image"
	"image/draw"
	"log"
	"os"
	"path/filepath"
	"strconv"

	"github.com/kolesa-team/go-webp/decoder"
	"github.com/kolesa-team/go-webp/encoder"
	"github.com/kolesa-team/go-webp/webp"
)

func main() {
	if len(os.Args) < 2 {
		panic("Need to pass file path")
	}

	if len(os.Args) < 3 {
		panic("Need to pass aspect ratio")
	}

	WTHR, err := strconv.ParseFloat(os.Args[2], 64)
	if err != nil {
		panic(err)
	}

	path, err := filepath.Abs(os.Args[1])
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(path)

	file, err := os.Open(path)
	if err != nil {
		log.Println("1")
		log.Fatal(err)
	}
	defer file.Close()


	imgDecoder, err := decoder.NewDecoder(file, &decoder.Options{})
	if err != nil {
		log.Println("3")
		log.Fatal(err)
	}

    imageMeta := imgDecoder.GetFeatures();
	
    width, height := float32(imageMeta.Width), float32(imageMeta.Height)
	fmt.Printf("width = %d, height = %d\n", imageMeta.Width, imageMeta.Height)


	log.Println("hello")

	newW, newH := getNewDimensions(width, height, float32(WTHR))

	trims := make([]float32, 4) // top, bottom, left, right
	if newW != float32(width) {
		dif := float32(width) - newW
		val := dif / 2
		trims[2] = val
		trims[3] = val
	}

	if newH != float32(height) {
		dif := float32(height) - newH
		val := dif / 2
		trims[0] = val
		trims[1] = val
	}

	newRect := image.Rect(
		int(trims[2]),
		int(trims[0]),
		int(width-trims[3]),
		int(height-trims[1]),
	)

	trimmedImg := image.NewRGBA(newRect)

    img, err := imgDecoder.Decode()
    if err != nil {
		log.Println("3")
		log.Fatal(err)
	}

	draw.Draw(trimmedImg, trimmedImg.Bounds(), img, image.Point{int(trims[2]), int(trims[0])}, draw.Src)

	log.Println("hello")
	output, err := os.Create("output.webp")
	if err != nil {
		log.Fatal(err)
	}
	defer output.Close()

	options, err := encoder.NewLossyEncoderOptions(encoder.PresetDefault, 100)
	if err != nil {
		log.Fatalln(err)
	}

	err = webp.Encode(output, trimmedImg, options)
	if err != nil {
		log.Println("4")
		log.Fatal(err)
	}


	fmt.Printf("Save output.webp ok\n")

}

/*
w=10
h=5
r=2
nr=1.5
nw=h*nr=7.5
*/

/*
h=8
w=4
r=0.5
nr=1
nh=w*nr
*/

// take Width Height and Width to Height Ratio
func getNewDimensions(w float32, h float32, WTHR float32) (float32, float32) {
	originalWTHR := w / h
	if originalWTHR == WTHR {
		return w, h
	} else if originalWTHR > WTHR {
		return h * WTHR, h
	} else {
		return w, w * WTHR
	}
}
