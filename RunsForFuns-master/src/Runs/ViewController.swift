//
//  ViewController.swift
//  Runs
//
//  Created by arek sahal on 2017-02-25.
//  Copyright © 2017 arek sahal. All rights reserved.
//

import UIKit
import Foundation
import CoreLocation
import MapKit
import CoreData

class ViewController: UIViewController, CLLocationManagerDelegate, MKMapViewDelegate {
    
    
//init the classes and make som global variables, hopefully they will disapear soon
    var locationManager = CLLocationManager()
    var myTimer = Timer()
    var refreshRate: Double = 1
    var newRun: NewRun = NewRun()
    var runStarted = false
    let appDelegate = UIApplication.shared.delegate as! AppDelegate


    
// Interface
    
    
    // Labels
    @IBOutlet weak var labelStart: UILabel!
    
    @IBOutlet weak var labelStart2: UILabel!
    
    @IBOutlet weak var speedLabel: UILabel!
    
    @IBOutlet weak var kmhLabel: UILabel!
    
    @IBOutlet weak var heightLabel: UILabel!
    
    @IBOutlet weak var timeLabel: UILabel!
    
    @IBOutlet weak var mapView: MKMapView!
    
    
    
    //Buttons
    
    @IBAction func pausButton(_ sender: Any) {
        if self.runStarted{
        self.myTimer.invalidate()
            self.runStarted = false}
        else {
            self.runStarted = true 
        self.myTimer = Timer.scheduledTimer(timeInterval: self.refreshRate, target: self, selector: #selector(ViewController.startRun), userInfo: nil, repeats: true)
        }
        
    }
    @IBAction func stopknapp(_ sender: Any) {
        
        self.myTimer.invalidate()
        if self.runStarted {
            newRun.end()
            
            speedLabel.text = "AvgPace"
            kmhLabel.text = String((round(newRun.calcPace(speed: newRun.avgSpeedTotal)*100)/100)) + " min/km"
            self.labelStart2.text = String(round(newRun.savedDistanceTraveled/10)/100) + " km"
            let context = appDelegate.persistentContainer.viewContext
            let saveRun = NSEntityDescription.insertNewObject(forEntityName: "Runs", into: context)
            
            saveRun.setValue(newRun.savedDistanceTraveled, forKey: "distance")
            saveRun.setValue(newRun.avgSpeedTotal, forKey: "speed")
            saveRun.setValue(newRun.totalTime, forKey: "time")
            saveRun.setValue(newRun.id, forKey: "date")
            saveRun.setValue(newRun.listWithSpeeds, forKey: "allspeeds")
            saveRun.setValue(newRun.listWithDistances, forKey: "alldistances")
            saveRun.setValue(newRun.listWithLocations, forKey: "alllocations")
            
            do{
            try context.save()
            print("SAVED")
        }
        
        catch{
            print("Can not be saved")
        }

        }
        self.runStarted = false
    }
    
    
    @IBAction func knappStart(_ sender: Any) {
        if !self.runStarted {
        self.newRun = NewRun()
        self.labelStart.text = "Distance Traveled:"
        self.speedLabel.text = "Pace"
        timeLabel.text = newRun.showTime(seconds: Int(newRun.time))
        self.runStarted = true
        let overlays = mapView.overlays
        mapView.removeOverlays(overlays)
        myTimer = Timer.scheduledTimer(timeInterval: self.refreshRate, target: self, selector: #selector(ViewController.startRun), userInfo: nil, repeats: true)
            
        }
        else {
        }
    }
    

    
    
    
// Functions that change the interface
    
    func updateLabels() {
        
        self.labelStart2.text = String(round(newRun.distanceTraveled/10)/100) + " km"
        
        self.kmhLabel.text = String((round(newRun.pace*100)/100)) + " min/km"
        
        self.timeLabel.text = newRun.showTime(seconds: Int(newRun.time))
        
        if let location = locationManager.location{
            self.mapView.setRegion(MKCoordinateRegionMake(location.coordinate, MKCoordinateSpan.init(latitudeDelta: 0.01, longitudeDelta: 0.01)), animated: true)
        }
        }
    
    
    
    
    
    //Functions

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if self.runStarted {
            newRun.duringRun(location: locations[0])
            let coo = newRun.sortCoord(lista: newRun.listWithLocations)
            let polyline = MKGeodesicPolyline(coordinates: coo, count: coo.count)
            mapView.add(polyline)
        }
        else{
        self.newRun.oldLocation = locations[0]
        }
    }
    
    
    func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
    if overlay is MKPolyline {
    let polylineRenderer = MKPolylineRenderer(overlay: overlay)
    polylineRenderer.strokeColor = UIColor.blue
    polylineRenderer.lineWidth = 5
    return polylineRenderer
    }
    
    return MKOverlayRenderer()
    }

    
    
    func startRun() {
        newRun.timer(refreshRate: self.refreshRate)
        self.updateLabels()
    }
    

    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.locationManager.delegate = self
        self.mapView.delegate = self
        self.locationManager.desiredAccuracy = kCLLocationAccuracyBest
        self.locationManager.requestWhenInUseAuthorization()
        self.locationManager.distanceFilter = 10
        self.locationManager.startUpdatingLocation()
        if let location = locationManager.location{
        self.mapView.setRegion(MKCoordinateRegionMake(location.coordinate, MKCoordinateSpan.init(latitudeDelta: 0.01, longitudeDelta: 0.01)), animated: true)}
        self.mapView.showsUserLocation = true

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
}
