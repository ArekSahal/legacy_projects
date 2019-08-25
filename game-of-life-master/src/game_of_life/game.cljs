(ns game-of-life.game)

(defn board-creator
  [rows columns l]
  (let [last-col? #(= columns %) last-row? #(= rows %)]
    (loop [row 0 col 0 board [] partial-board []]
      (if (last-row? row) board (recur
                                  (if (last-col? col) (+ row 1) row)
                                  (if (last-col? col) 0 (+ col 1))
                                  (if (last-col? col) (conj board partial-board) board)
                                  (if (last-col? col) [] (if (some #(= [(+ row 1) (+ col 1)] %) l)
                                                           (conj partial-board 1)
                                                           (conj partial-board 0))))))))


(defn roundex
  [row col]

  [[row (- col 1)]
   [row (+ col 1)]
   [(+ row 1) (- col 1)]
   [(+ row 1) col]
   [(+ row 1) (+ col 1)]
   [(- row 1) (- col 1)]
   [(- row 1) col]
   [(- row 1) (+ col 1)]])

(defn check-around
  [row col s]
  (let [points (roundex row col)]
    (reduce + (mapv #(if (= (get (get s (get % 0)) (get % 1)) 1) 1 0) points))))


(defn get-amount-neighbours

  [s]
  (let [last-col? #(= % (count (get s 0)))]
    (loop [row 0 col 0 result [] partial-results []] ;The last-col? function just checks if we are at the end of the row
      (if (= row (count s)) result
                            (recur (if (last-col? col) (+ row 1) row)
                                   (if (last-col? col) 0 (+ col 1))
                                   (if (last-col? col) (conj result partial-results) result)
                                   (if (last-col? col) [] (conj partial-results (check-around row col s)))
                                   )))))


(defn does-survive?

  [n x]
  (if (= x 1) (if (or (< n 2) (> n 3) false) 0 1) (if (= n 3) 1 0))) ;Two diffirent functions depending on if the cell was alive before or not


(defn natural-selection
  [s]
  (let [amount-neigh (get-amount-neighbours s)] (loop [index 0 result []]
                                                  (if (= index (count s))
                                                    result
                                                    (recur (+ index 1)
                                                           (conj result (mapv does-survive? (get amount-neigh index) (get s index))))))))

(defn survivors [s]
  (let [state (natural-selection (board-creator 23 23 (mapv #(mapv inc %) s))) last-col? #(= 23 %)]
    (loop [row 0 col 0 result #{}] (if (= row 23) result (recur (if (last-col? col) (+ row 1) row) (if (last-col? col) 0 (+ col 1)) (if (= 1 (get (get state row) col)) (conj result [row col]) result))))
    )
  )


(defn random-board

  [rows cols]
  (board-creator rows cols (repeatedly (/ (* rows cols) 3) #(conj [] (rand-int rows) (rand-int cols))))
  )
