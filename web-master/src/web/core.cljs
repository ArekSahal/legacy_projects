(ns web.core
  (:require [reagent.core :as reagent]
            [reagent.ratom :as ratom]
            [goog.events :as events]
            [goog.events.EventType :as EventType]
            [goog.dom :as dom]
            [garden.core :refer [css]]
            [web.flexblock :as flex]))

(enable-console-print!)

()

(println "This text is printed from src/web/core.cljs. Go ahead and edit it and see reloading in action.")

;; define your app data so that it doesn't get over-written on reload

(defonce state (reagent/atom {
                              :scroll 0
                              :color "black"
                              }))
(def colors ["green" "red" "yellow" "black" "blue" "gold" "purple"])

(def photos ["profile.jpg" "photo1.jpg" "ali.png" "background2.jpeg" "background1.jpeg" "weather.png" "facebook.png" "profile.png"])
 (def size 900)

(def foods [{:picture "photos/photo0.JPG"
             :recipe "text goes here"
             :title "Choclate Cocktail"}
            {:picture "photos/photo1.JPG"
             :recipe "text goes here"
             :title "Sunday Waffle"}
            {:picture "photos/photo2.JPG"
             :recipe "text goes here"
             :title "Crepe avec du Chocola"}
            {:picture "photos/photo3.JPG"
             :recipe "text goes here"
             :title "Apple-Seafood Wrap"}
            {:picture "photos/photo4.JPG"
             :recipe "text goes here"
             :title "French Breakfast"}
            {:picture "photos/photo5.JPG"
             :recipe "text goes here"
             :title "Berry-Morning"}
            {:picture "photos/photo6.JPG"
             :recipe "text goes here"
             :title "Pasta Micasa"}
            {:picture "photos/photo7.JPG"
             :recipe "text goes here"
             :title "Mudcake"}])

(defn createFood [a] {:picture (str a ".JPG")
             :recipe "text goes here"
             :title "Tasty Food Goes Here"})


(defn createFoodBlock [food id] [:div {
                                    :class "container"
                                    } [:img {
                                          :src (:picture food)
                                          }]
                              [:a {
                                   :on-click #(println id)
                                   :class "food-title"
                                       } (:title food)]])


(defn style [] [:style (css
                         [:body {
                                 :background-color "white"
                                 }]
                         [:.container {
                                       :position "relative"
                                       :margin "auto"
                                      :height "inherit"
                                      :width "inherit"

                                      }]
                         [:img {
                                ;:height (flex/getSize size 1)
                                ;:width (flex/getSize size 1)
                                :opacity "1"
                                :transition "opacity 1s ease-out"
                                :height "inherit"
                                :width "inherit"
                                ;switch if you want photos to be sized appropriately
                                }]
                         [:.food-title {

                                      :width (flex/getSize size 1)
                                      :opacity "0"
                                      :position "absolute"
                                      :bottom "0"
                                      :left "0"
                                      :z-index "3"
                                      :font-size "50px"
                                      :color "white"
                                        ;:display "none"
                                      :font-family "Pacifico, cursive;"
                                        :transition "all 0.2s ease"
                                      }]
                         [:.container:hover
                          [:.food-title {
                                         :transition "all 2s ease"
                                         :opacity "1"
                                         ;:display "inline"
                                       }]
                          [:img {
                                 :transition "opacity 1s ease-out"
                                 :position "absolute"
                                 :opacity "0.5"
                                 }]]
                         [:.blocks (flex/blocksize size 1 1) ]

                         [:.content {
                                     :position "absolute"
                                     :right "0"
                                     :top "200px"
                                     :height "900px"
                                     :width "80vw"
                                     :padding-bottom "100px"
                                     }]
                         [:.header {
                                    :position "absolute"
                                    :top "0"
                                    :left "37%"
                                    :margin "auto"
                                    :width "300px"
                                    :height "200px"
                                    :text-align "center"
                                    }]
                         [:.side-bar {
                                      :position "absolute"
                                      :left "0"
                                      :top "200px"
                                      :width "20vw"
                                      :height "700px"

                                      }]
                         [:.meny {
                                  :list-style-type "none"
                                  }]
                         [:li {
                               :font-family "Pacifico, cursive;"
                               :margin-bottom "50px"
                               :font-size "50px"
                               :color "#d4a06e"
                               }]
                         [:.headline {
                                      :font-family "Pacifico, cursive;"
                                      :font-size "100px"
                                      :color "#d4a06e"
                                      :margin "auto"
                                      }])])


(defn content [elements] [:div {
                        :class "content"
                        } (for [i (range (count elements))] (get elements i))])

(defn header [] [:div {
                       :class "header"
                       } [:label {:class "headline"} "FaceFood"]])

(defn side-bar [] [:div {
                         :class "side-bar"
                         } [:ul {:class "meny"} [:li "Home"] [:li "MyPage"] [:li "Favorites"] [:li "Explore"]]])



(defn food-grid [n] (flex/flexbundle size (into [] (for [i (range n)] (createFoodBlock (get foods i) i)))))







(defn hello-world []
  [:div {
         } (header ) (content [(food-grid 8)] ) (side-bar) (style)])

(reagent/render-component [hello-world]
                          (. js/document (getElementById "app")))

(defn on-js-reload []
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
)
