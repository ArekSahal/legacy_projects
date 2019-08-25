(ns flappybird.core
  (:require [reagent.core :as reagent :refer [atom]]
            [flappybird.engine :as phy]))

(enable-console-print!)

;; define your app data so that it doesn't get over-written on reload

(def constants {:birdspeed -0.9
                :gravity 0.025
                :pipes 0.35
                :air-resistance {:upplimit -0.75 :downlimit 0.6}
                :birdx 13
                :refreshtime 10
                :ground 100
                :birdradius 2
                :opening 85
                :pipewidth 3})

(def clean-state
  {:bird {:pos {:x (:birdx constants) :y 60} :vel {:x 0 :y 0} :acc {:x 0 :y 0}}
   :pipes [[(rand-nth (range 30 60)) 140]
          [(rand-nth (range 30 60)) 100]
          [(rand-nth (range 30 60)) 60]]
   :game-started false
   :points 0
   :shoud-get-score? true}


  )

(defonce app-state (atom {:bird
                            {:pos {:x (:birdx constants) :y 60} :vel {:x 0 :y 0} :acc {:x 0 :y 0}}
                          :pipes
                              [[(rand-nth (range 30 60)) 140]
                               [(rand-nth (range 30 60)) 100]
                               [(rand-nth (range 30 60)) 60]]
                          :game-started false
                          :points 0
                          :should-get-score? true}
                        ))


(defn change-altitude [state]
  (update-in state [:bird :pos :y] + (get-in state [:bird :vel :y]))
  )

(defn change-velocity [state]
  (if (and (> (get-in state [:bird :pos :y]) (- (:ground constants) 2)) (> (get-in state [:bird :vel :y]) 0))
    (assoc-in state [:bird :vel :y] 0)
    (update-in state [:bird :vel :y] + (get-in state [:bird :acc :y])))
  )

(defn air-resistance [state]
  (cond
    (< (get-in state [:bird :vel :y]) (get-in constants [:air-resistance :upplimit])) (assoc-in state [:bird :vel :y] (get-in constants [:air-resistance :upplimit]))
    (> (get-in state [:bird :vel :y]) (get-in constants [:air-resistance :downlimit])) (assoc-in state [:bird :vel :y] (get-in constants [:air-resistance :downlimit]))
    :else state)
  )

(defn reset-acceleration [state]
  (assoc-in state [:bird :acc :y] 0)
  )

(defn gravity [state]
    (if (< (+ 1 (:ground constants)) (get-in state [:bird :pos :y]))
      state
      (update-in state [:bird :acc :y] + (:gravity constants))))


(defn hit-ground? [state]
  (if (> (get-in state [:bird :pos :y]) (:ground constants))
    (assoc-in state [:bird :pos :y] (:ground constants))
    state)
  )

(defn move-pipes [state]
  (assoc state :pipes (mapv #(if (< (get % 1) -1) [(rand-nth (range 30 60)) 119] [(get % 0) (- (get % 1) (:pipes constants))]) (:pipes state))))

(defn same-x? [state pipe]
  (if (and (< (- (get-in state [:bird :pos :x]) (get pipe 1)) (/ (:pipewidth constants) 2)) (> (- (get-in state [:bird :pos :x]) (get pipe 1)) (/ (:pipewidth constants) -2)))
     true false)
  )

(defn hit-the-pipes? [state pipe]
  (if (or (> (get-in state [:bird :pos :y]) (- 98 (get pipe 0))) (< (get-in state [:bird :pos :y]) (- (+ (:opening constants) 1) (get pipe 0))) false) true false)
  )

(defn did-hen-make-it? [state]
  (loop [i 0 survive true] (if (= i (count (:pipes state))) (if survive state (assoc state :game-started false)) (recur (+ i 1) (if (and
                                                                                                                    (same-x? state (get (:pipes state) i))
                                                                                                                    (hit-the-pipes? state (get (:pipes state) i)))
                                                                                                                false
                                                                                                                survive)))))

(defn point? [state]
  (loop [i 0 point false] (if (= i (count (:pipes state))) (if (and point (:should-get-score? state)) (update (assoc state :shoud-get-score? false) :points inc) (if point state (assoc state :should-get-score? true))) (recur (+ i 1) (if (same-x? state (get (:pipes state) i)) true point))))


  )


(defn physics [state]
  (-> state
      (gravity)
      (change-velocity)
      (reset-acceleration )
      (air-resistance )
      (change-altitude)
      (hit-ground? )
      (move-pipes )
      (did-hen-make-it?)
      (point? ))
  )

(defn game-loop []
  (js/setInterval  #(if (:game-started @app-state) (swap! app-state physics) nil) (:refreshtime constants)))

(defn start-game []
  (do (swap! app-state assoc :game-started true))
  )

(game-loop)


(defn reset-game []
  (reset! app-state clean-state)
  )



#_(updater)

(defn hello-world []
  (let [state @app-state]
    [:center
     {
      }
     (into (into
       [:svg
        {:view-box "0 0 60 100"
         :height 600
         :width 330
         :fill "skyblue"
         :on-click
                   #(swap! app-state assoc-in [:bird :acc :y] (:birdspeed constants))
         }
        [:rect {
                :height 100
                :width 100
                :on-click
                        #(swap! app-state assoc-in [:bird :acc :y] (:birdspeed constants))
                }]
        [:text {
                :x 48
                :y 6
                :font-size 8
                :fill "black"
                }
         (int (/ (:points state) 7))
         ]
        [:text {
                :font-size 4
                :fill "black"
                :x 0
                :y 100
                :on-click #(reset-game)
                }
         "RESET"]
        [:text {
                :font-size 4
                :fill "black"
                :x 48
                :y 100
                :on-click #(start-game)
                }
         "START"]
        [:circle {:r  2
                  :cx (get-in state [:bird :pos :x])
                  :cy (get-in state [:bird :pos :y])
                  :fill "yellow"
                  }]]
       (for [i (range 3)]
         [:rect {
               :height (get (get (:pipes state) i) 0)
               :width (:pipewidth constants)
               :fill "green"
               :x (get (get (:pipes state) i) 1)
               :y (- 100 (/ (get (get (:pipes state) i) 0) 1))
               }]))
       (for [i (range 3)]
          [:rect {
             :height (- (:opening constants) (get (get (:pipes state) i) 0) )
             :width (:pipewidth constants)
             :fill "green"
             :x (get (get (:pipes state) i) 1)
             :y 0
             }]) )



     ])
  )

(reagent/render-component [hello-world]
                          (. js/document (getElementById "app")))

 (defn on-js-reload []
   ;; optionally touch your app-state to force rerendering depending on
   ;; your application
   ;; (swap! app-state update-in [:__figwheel_counter] inc)
   )
