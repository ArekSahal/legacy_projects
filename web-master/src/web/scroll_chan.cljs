(ns scroll-demo.scroll-chan
  (:require
            [goog.events :as events]
            [goog.events.EventType :as EventType]
            [goog.dom :as dom]))


(defn get-scroll []
  (.-y (dom/getDocumentScroll)))
