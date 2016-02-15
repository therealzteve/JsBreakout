(define (script-fu-path-generator inImg inLayer)

	(let*
		(
			(path (car (gimp-vectors-new inImg "test")))
			(strokeId  (car (gimp-vectors-bezier-stroke-new-moveto path 100 100)))
		)
		(gimp-vectors-bezier-stroke-lineto path strokeId 200 100)
		(gimp-image-insert-vectors inImg path 0 0 )
		
		
	 
		
	) ;end of our local variables
	
)
  (script-fu-register
    "script-fu-path-generator"                  ;func name
    "PathGenerator"                                  ;menu label
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
  (script-fu-menu-register "script-fu-path-generator" "<Image>/Zteve/Animation")