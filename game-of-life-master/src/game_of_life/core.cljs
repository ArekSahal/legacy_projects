(ns game-of-life.core
  (:require [reagent.core :as reagent :refer [atom]]
            [game-of-life.game :as g ]))

(enable-console-print!)

(println "Yo! What up!?")

;; define your app data so that it doesn't get over-written on reload

(defn game-board [n]
  (vec (repeat n (vec (repeat n 0)))))

(defonce app-state (atom {:text "Game Of Life!"
                          :board (game-board 23)
                          :live-cells #{}
                          :game-ongoing? false}))

(defonce time-updater (js/setInterval
                        #(if (:game-ongoing? @app-state) (swap! app-state update :live-cells g/survivors) nil) 300))


(defn start-game []
  (swap! app-state assoc :game-ongoing? true))

(defn stop-game []
  (swap! app-state assoc :game-ongoing? false))

(defn reset []
  (do (swap! app-state assoc :game-ongoing? false)
      (swap! app-state assoc :live-cells #{})))

(defn tictactoe []
  [:center
   [:h1 (:text @app-state)]
   [:h2
    [:button {
              :on-click
              start-game}
         "Start"]
    [:button {
              :on-click
              stop-game}
     "Stop"]
    [:button {:on-click
              reset}
     "Reset "]]
   (into
     [:svg
          {:view-box "0 0 10 10"
           :width 500
           :height 500}]
          (for [i (range (count (:board @app-state)))
                j (range (count (:board @app-state)))]
            [:rect {:width 0.45
                    :height 0.45
                    :fill (if (contains? (:live-cells @app-state) [i j]) "green" "gold")
                    :x (/ i 2)
                    :y (/ j 2)
                    :on-click
                    #(swap! app-state update :live-cells conj [i j])
                    }]))])

(reagent/render-component [tictactoe]
                          (. js/document (getElementById "app")))

(defn on-js-reload []
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
)
