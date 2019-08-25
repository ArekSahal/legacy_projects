//
//  SpecsView.swift
//  Runs
//
//  Created by arek sahal on 2017-03-13.
//  Copyright © 2017 arek sahal. All rights reserved.
//

import Foundation
import UIKit
import CoreData
class SpecsView: UITableViewController {
    
    var run: Run?
    var object: NSManagedObject?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if let pastRun = self.object {
            self.run = Run(distance: pastRun.value(forKey: "distance") as! Double,time: pastRun.value(forKey: "time") as! Double, avgSpeed: pastRun.value(forKey: "speed") as! Double, listD: pastRun.value(forKey: "alldistances") as! [Double], listS: pastRun.value(forKey: "allspeeds") as! [Double])
        }

        tableView.delegate = self
        
        
        // Do any additional setup after loading the view
    }
    
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return createDictWithAvg(listWithspeeds: run!.listWithSpeeds, listWithDistance: run!.listWithDistances).count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        // Getting the right element
        let element = createDictWithAvg(listWithspeeds: run!.listWithSpeeds, listWithDistance: run!.listWithDistances)[indexPath.row]
        
        // Instantiate a cell
        let cell = UITableViewCell(style: .subtitle, reuseIdentifier: "ElementCell")
        
        // Adding the right informations
        cell.textLabel?.text = String(indexPath.row + 1) + " km"
        cell.detailTextLabel?.text = String(element) + " min/km"
        tableView.sizeToFit()
        
        // Returning the cell
        return cell}
    
    
    func createDictWithAvg(listWithspeeds: [Double], listWithDistance: [Double]) -> [Double]{
        var mapAvg: [Double] = []
        var count: Double = 1000
        var lastStop: Int = 0
        for i in 0...(listWithDistance.count - 1) {
            if listWithDistance[i] > count {
                count += 1000
                let hello: [Double] = Array(listWithspeeds[lastStop...i])
                mapAvg.append(round(run!.calcPace(speed: run!.calcSpeed(speedHis: hello))*10)/10)
                lastStop = i
            }
        }
        return mapAvg
        
    }

    
}
