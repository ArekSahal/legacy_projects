//
//  DetailsViewController.swift
//  Runs
//
//  Created by arek sahal on 2017-03-02.
//  Copyright © 2017 arek sahal. All rights reserved.
//

import UIKit
import CoreData
import MapKit

class DetailsViewController: UIViewController, UITableViewDelegate, MKMapViewDelegate {
    @IBOutlet weak var mapView: MKMapView!
    
    var run: Run?
    var object: NSManagedObject?
    
    
    @IBOutlet weak var timeLabel: UILabel!
    @IBOutlet weak var speedLabel: UILabel!
    @IBOutlet weak var distanceLabel: UILabel!
    
    @IBAction func removeRun(_ sender: Any) {
        //deletes the object from device-memory
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        let context = appDelegate.persistentContainer.viewContext
        context.delete(object!)
        
        do{
        try context.save()
            
            performSegue(withIdentifier: "backToTable", sender: self)
        }
        catch{
        print("not saved")
        }
        
    }
    
    func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
        //Deleget to display route
        if overlay is MKPolyline {
            let polylineRenderer = MKPolylineRenderer(overlay: overlay)
            polylineRenderer.strokeColor = UIColor.blue
            polylineRenderer.lineWidth = 5
            return polylineRenderer
        }
        
        return MKOverlayRenderer()
    }
    

    override func viewDidLoad() {
        super.viewDidLoad()
        mapView.delegate = self
        if let pastRun = self.object {
            self.run = Run(distance: pastRun.value(forKey: "distance") as! Double,time: pastRun.value(forKey: "time") as! Double, avgSpeed: pastRun.value(forKey: "speed") as! Double, listD: pastRun.value(forKey: "alldistances") as! [Double], listS: pastRun.value(forKey: "allspeeds") as! [Double], listL: pastRun.value(forKey: "alllocations") as! [Double])
        self.mapView.setRegion(MKCoordinateRegionMake(run!.sortCoord(lista: run!.listWithLocations)[0], MKCoordinateSpan.init(latitudeDelta: 0.016, longitudeDelta: 0.016)), animated: true)
            let coo = run!.sortCoord(lista: run!.listWithLocations)
            let polyline = MKGeodesicPolyline(coordinates: coo, count: coo.count)
            mapView.add(polyline)

            self.setLabels()
        }
        
            
    

        // Do any additional setup after loading the view
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func setLabels() {
    
        self.distanceLabel.text = String(round(self.run!.savedDistanceTraveled/10)/100) + " km"
        self.speedLabel.text = String(round(self.run!.calcPace(speed: self.run!.calcSpeed(speedHis: run!.listWithSpeeds))*10)/10) + " min/km"
        self.timeLabel.text = run!.showTime(seconds: Int(self.run!.totalTime))
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) 
    {
        if (segue.identifier == "myEmbeddedSegue") {
            let destination = segue.destination as! SpecsView
            // Now you have a pointer to the child view controller.
            // You can save the reference to it, or pass data to it.
            destination.object = self.object
        }
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
