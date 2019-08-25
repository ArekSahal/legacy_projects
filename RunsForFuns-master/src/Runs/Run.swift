//
//  Run.swift
//  Runs
//
//  Created by arek sahal on 2017-03-02.
//  Copyright © 2017 arek sahal. All rights reserved.
//

import Foundation
import UIKit
import CoreLocation

class Run {
    let id: Date
    var savedDistanceTraveled: Double
    var totalTime: Double
    var avgSpeedTotal: Double
    var date = NSDate()
    var listWithDistances: [Double]
    var listWithSpeeds: [Double]
    var listWithLocations: [Double]
    
    
    init(distance: Double, time: Double, avgSpeed: Double, listD: [Double], listS: [Double], listL: [Double] = []){
    self.id = NSCalendar.current.date(from: NSCalendar.current.dateComponents([.minute, .hour, .day, .month, .year], from: date as Date))!
    self.savedDistanceTraveled = distance
    self.totalTime = time
    self.avgSpeedTotal = avgSpeed
    self.listWithSpeeds = listS
    self.listWithDistances = listD
    self.listWithLocations = listL
    }
    
    
    func showTime(seconds: Int) -> String {
        
        if seconds == 0{
            return "0:0"
        }
        else {
            let sec = seconds % 60
            let min = (seconds - sec)/60
            return "\(min):\(sec)"
        }
    }

    
    
    func calcPace(speed: Double) -> Double{
        if speed > 0 {
            let pace = abs((1.0/speed)*(1000/60))
            return pace
        }
        else{
            let pace = 0.0
            return pace
        }
    }
    
    func calcSpeed(speedHis: [Double]) -> Double{
        var meanSpeed: Double = 0
        for i in speedHis {
            meanSpeed = meanSpeed + i
            
        }
        meanSpeed = meanSpeed/Double(speedHis.count)
        
        if meanSpeed > 0 {
            return  meanSpeed
        }
        else {
            return 0
        }
    }
    
    func sortCoord(lista: [Double]) -> [CLLocationCoordinate2D] {
        var locations: [CLLocationCoordinate2D] = []
        var checker = false
        var placeholder: [Double] = []
        for i in lista {
            if checker {
                placeholder.append(i)
                locations.append(CLLocationCoordinate2D.init(latitude: placeholder[0], longitude: placeholder[1]))
                checker = false
                placeholder = []
            }
            else {
                placeholder.append(i)
                checker = true
            }
        }
        return locations
    }


}
