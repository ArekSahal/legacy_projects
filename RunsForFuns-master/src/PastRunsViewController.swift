//
//  PastRunsViewController.swift
//  Runs
//
//  Created by arek sahal on 2017-03-03.
//  Copyright © 2017 arek sahal. All rights reserved.
//

import Foundation
import UIKit
import CoreData

class PastRunsVievarntroller: UITableViewController {
    
    
    let appDelegate = UIApplication.shared.delegate as! AppDelegate
    
    var pastRuns: [NSManagedObject] = []
    
    // cell reuse id (cells that scroll out of view can be reused)
    let cellReuseIdentifier = "Cell"
    
    // don't forget to hook this up from the storyboard
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let context = appDelegate.persistentContainer.viewContext
        
        let request = NSFetchRequest<NSFetchRequestResult>(entityName: "Runs")
        request.returnsObjectsAsFaults = false
        
        do{
            let results = try context.fetch(request)
            for i in results {
                self.pastRuns.append(i as! NSManagedObject)
                
            }
            
        }
        catch {
        }
        // Register the table view cell class and its reuse id
        self.tableView.register(UITableViewCell.self, forCellReuseIdentifier: cellReuseIdentifier)
        
        // This view controller itself will provide the delegate methods and row data for the table view.
        tableView.delegate = self
        tableView.dataSource = self
    }
    
    // number of rows in table view
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.pastRuns.count
    }
    
    // create a cell for each table view row
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        // create a new cell if needed or reuse an old one
        let cell:UITableViewCell = self.tableView.dequeueReusableCell(withIdentifier: cellReuseIdentifier) as UITableViewCell!
        
        // set the text from the data model
        let date = self.pastRuns[indexPath.row].value(forKey: "date")! as! NSDate
        cell.textLabel?.text = date.description
        return cell
    }
    
    // method to run when table view cell is tapped
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
     
        self.performSegue(withIdentifier: "ShowDetailsSegue", sender: self)
    }
    
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if  segue.identifier == "ShowDetailsSegue",
            let destination = segue.destination as? DetailsViewController,
            let blogIndex = tableView.indexPathForSelectedRow?.row
        {
            let pastRun = pastRuns[blogIndex]
            print(pastRun)
            destination.object = pastRun
        }
    }
    
}
