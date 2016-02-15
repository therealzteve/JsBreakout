(define (script-fu-blur-animation inImg inLayer)

	(let*
		(
			(amountLayers 0)
			(maxAmountLayers 40)
			(blurAmount 1)
			(blurIncrease 1)
			(theLayer )
		)
	 
		(while (< amountLayers maxAmountLayers)
			(set! theLayer
				(car
					(gimp-layer-copy
						inLayer
						TRUE
					)
				)
			)
			(gimp-image-insert-layer inImg theLayer 0 0)	
			
			(plug-in-gauss
				1
				inImg
				theLayer
				blurAmount
				blurAmount
				0
			)
				
			(set! blurAmount (+ blurAmount blurIncrease))	
			(set! amountLayers (+ 1 amountLayers))
		)
	) ;end of our local variables
	
)
  (script-fu-register
    "script-fu-blur-animation"                  ;func name
    "Blur Animation"                                  ;menu label
    "Creates a simple text box, sized to fit\
      around the user's choice of text,\
      font, font size, and color."              ;description
    "Michael Terry"                             ;author
    "copyright 1997, Michael Terry;\
      2009, the GIMP Documentation Team"        ;copyright notice
    "October 27, 1997"                          ;date created
    ""                     ;image type that the script works on
    SF-IMAGE      "IMAGE" 0             ;a string variable
	SF-DRAWABLE   "IMAGE_LAYER" 0
  )
  (script-fu-menu-register "script-fu-blur-animation" "<Image>/Zteve/Animation")