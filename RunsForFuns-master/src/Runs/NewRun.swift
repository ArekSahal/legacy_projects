//
//  NewRun.swift
//  Runs
//
//  Created by arek sahal on 2017-02-27.
//  Copyright © 2017 arek sahal. All rights reserved.
//

import Foundation
import UIKit
import CoreLocation

class NewRun: Run {
    
    var distanceTraveled: Double = 0
    var oldLocation: CLLocation?
    var shortSpeedHistory: [Double] = []
    var time: Double = 0
    var speedHistory: [Double] = []
    var currentSpeed: Double = 0
    var pace: Double = 0
    var place: CLLocation?

    
    init(){
        super.init(distance: 0, time: 0, avgSpeed: 0, listD: [], listS: [], listL: [])
    
    }
    
    func duringRun(location: CLLocation) {
        self.place = location
        let speed = self.place!.speed
        self.speedHistoryReg(speed: speed)
        self.currentSpeed = self.calcSpeed(speedHis: self.shortSpeedHistory)
        self.pace = self.calcPace(speed: currentSpeed)
        self.speedHistory.append(self.currentSpeed)
        if let oldPos = self.oldLocation {
        let dis = self.place!.distance(from: oldPos)
        self.distanceTraveled += dis
        self.oldLocation = place
            
        }
        else {
            self.oldLocation = place
        }
        self.listWithDistances.append(distanceTraveled)
        self.listWithSpeeds.append(currentSpeed)
        self.listWithLocations.append(self.place!.coordinate.latitude)
        self.listWithLocations.append(self.place!.coordinate.longitude)
    }

    
    @objc func timer(refreshRate: Double) {
        self.time += refreshRate
    }
    
    
    func end() {
        self.currentSpeed = 0
        self.shortSpeedHistory = []
        self.oldLocation = nil
        self.avgSpeedTotal = self.savedDistanceTraveled/self.totalTime
        self.totalTime = self.time
        self.time = 0
        self.savedDistanceTraveled = self.distanceTraveled
        self.distanceTraveled = 0.0
        self.avgSpeedTotal = self.savedDistanceTraveled/self.totalTime
    }

    
    func speedHistoryReg(speed: Double){
        if self.shortSpeedHistory.count == 3{
            self.shortSpeedHistory.remove(at: 0)
        }
        self.shortSpeedHistory.append(speed)
        
    }
    

















}
