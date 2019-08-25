(ns web.flexblock
  (:require [garden.core :refer [css]]))


(defn getSize [widthOrHeight size] (str (/ widthOrHeight (/ 3 size)) "px"))

;This is a library that creates a box with rectangles in them that when hovered on expand
;Right now if you wish to use it u will be required to input the height and width manually each time
;basically in your flexbundle function give it the size of the square that you want and then but in the elements
;that you want to have in the different squares. The ids of the squares will be "block0","block1"...
;so in your css file give all of the elements their different sizes to fit as you like
;but you will have to manually input the size of your wrappersquare manually, i suggest creating a variable.



(defn flexblock [el id] [:div {
                            :id (str "block" id)
                            :class "blocks animated fadeInUp"
                               :style {
                                       :animation-delay (str (* id 0.2) "s")
                                       }
                            }
                      el ])

(defn flexyBlocks [elements] [:div {
                            :class "wrapperflex"
                            }
                      (for [i (range (count elements))] (flexblock (get elements i) i))])


(defn blocksize [size w h] {
                       :grid-row (str "span " h)
                       :grid-column (str "span " w)
                       :height (getSize size h)
                       :width (getSize size w)

                       } )


(defn blockstyle [h] [:style (css
                         [:.wrapperflex {
                                         :display "grid"
                                         :width (getSize h 3)
                                         ;change below to what it says above
                                         :height "600px"
                                         :border-radius "30px"
                                         }]
                         [:.blocks {
                                    :border-style "solid"
                                    :border-color "white"
                                    :border-width "5px"
                                    :background-color "black !important"
                                    :max-width "600px"
                                    :max-height "600px"
                                    :justify-self "center"
                                    :align-self "center"
                                    :transition "all 0.2s ease-out"
                                    :overflow "hidden"
                                    }]
                         [:.blocks:hover {
                                          :border-radius "50px"
                                          :position "relative"
                                          :height (str 400 "px !important")
                                          :width (str 400 "px !important")
                                          :margin "-50px"
                                          :transition " all 0.4s ease-out"
                                          :z-index "10"
                                          }]
                         )])

(defn flexbundle [h el] [:div (flexyBlocks el) (blockstyle h)])







(comment example style (defn style [] [:style (css
                                  [:#block0 (flex/blocksize size 1 2) {
                                                                       :background-color "#69D2E7"
                                                                       }]
                                  [:#block1 (flex/blocksize size 2 1) {
                                                                       :background-color "#A7DBD8"
                                                                       }]
                                  [:#block2 (flex/blocksize size 1 1) {
                                                                       :background-color "#E0E4CC"
                                                                       }]
                                  [:#block3 (flex/blocksize size 1 1) {
                                                                       :background-color "#F38630"
                                                                       }]
                                  [:#block4 (flex/blocksize size 2 1) {
                                                                       :background-color "#FA6900"
                                                                       }]
                                  [:#block5  (flex/blocksize size 1 1) {
                                                                        :background-color "#4ECDC4"
                                                                        }]
                                  [:#block6  (flex/blocksize size 3 1) {
                                                                        :background-color "#C7F464"
                                                                        }]
                                  [:#block7 (flex/blocksize size 2 1) {
                                                                       :background-color "#FF6B6B"
                                                                       }]
                                  )]))