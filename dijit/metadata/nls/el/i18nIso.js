// COPYRIGHT © 2015 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
define({documentTypes:{data:{caption:"ISO 19115 (Δεδομένα)",description:""},service:{caption:"ISO 19119 (Υπηρεσία)",description:""},gmi:{caption:"ISO 19115-2 (Απεικονιστικά και Πλεγματικά δεδομένα)",description:""}},general:{reference:"Αναφορά"},sections:{metadata:"Μεταδεδομένα",identification:"Αναγνώριση",distribution:"Διανομή",quality:"Ποιότητα",acquisition:"Απόκτηση"},metadataSection:{identifier:"Αναγνωριστικό",contact:"Επικοινωνία",date:"Ημερομηνία",standard:"Τυπική",reference:"Αναφορά"},identificationSection:{citation:"Παραπομπή",description:"Περιγραφή",contact:"Επικοινωνία",thumbnail:"Μικρογραφία",keywords:"Λέξεις-κλειδιά",constraints:"Περιορισμοί",resource:"Πόρος",resourceTab:{representation:"Αναπαράσταση",language:"Γλώσσα",classification:"Κατηγοριοποίηση",extent:"Έκταση"},serviceResourceTab:{serviceType:"Τύπος υπηρεσίας",extent:"Έκταση",couplingType:"Τύπος σύζευξης",operation:"Λειτουργία",operatesOn:"Λειτουργεί σε"}},distributionSection:{},qualitySection:{scope:"Πεδίο εφαρμογής",conformance:"Συμμόρφωση",lineage:"Προέλευση"},acquisitionSection:{requirement:"Απαίτηση",objective:"Στόχος",instrument:"Όργανο",plan:"Πλάνο",operation:"Λειτουργία",platform:"Πλατφόρμα",environment:"Περιβάλλον"},AbstractMD_Identification:{sAbstract:"Αφηρημένη",purpose:"Σκοπός",credit:"Συντελεστές",pointOfContact:"Αρμόδιος επικοινωνίας",resourceMaintenance:"Συντήρηση",graphicOverview:"Γραφική επισκόπηση",descriptiveKeywords:"Συλλογή λέξεων-κλειδιών",resourceConstraints:"Περιορισμοί"},CI_Address:{deliveryPoint:"Σημείο παράδοσης",city:"Πόλη",administrativeArea:"Περιοχή διαχείρισης",postalCode:"Ταχυδρομικός κώδικας",country:"Χώρα",electronicMailAddress:"E-mail διεύθυνση"},CI_Citation:{title:"Τίτλος",alternateTitle:"Εναλλακτικός τίτλος",identifier:"Μοναδικό αναγνωριστικό πόρου",resource:{title:"Τίτλος πόρου",date:"Ημ/νία πόρου"},specification:{title:"Τίτλος προδιαγραφής",date:"Ημερομηνία προδιαγραφής"}},CI_Contact:{phone:"Τηλέφωνο",address:"Διεύθυνση",onlineResource:"Online πόρος",hoursOfService:"Ώρες υπηρεσίας",contactInstructions:"Οδηγίες επικοινωνίας"},CI_Date:{date:"Ημερομηνία",dateType:"Τύπος ημερομηνίας"},CI_DateTypeCode:{caption:"Τύπος ημερομηνίας",creation:"Ημ/νία δημιουργίας",publication:"Ημ/νία δημοσίευσης",revision:"Ημ/νία αναθεώρησης"},CI_OnLineFunctionCode:{caption:"Τομέας",download:"Λήψη",information:"Πληροφορίες",offlineAccess:"Πρόσβαση χωρίς σύνδεση",order:"Σειρά",search:"Αναζήτηση"},CI_OnlineResource:{caption:"Online πόρος",linkage:"URL",protocol:"Πρωτόκολλο",applicationProfile:"Προφίλ εφαρμογής",name:"Όνομα",description:"Περιγραφή",sFunction:"Τομέας"},CI_ResponsibleParty:{caption:"Αρμόδιος επικοινωνίας",individualName:"Όνομα φυσικού προσώπου",organisationName:"Όνομα οργανισμού",positionName:"Όνομα θέσης",contactInfo:"Πληροφορίες επικοινωνίας",role:"Ρόλος"},CI_RoleCode:{caption:"Ρόλος",resourceProvider:"Πάροχος πόρου",custodian:"Υπόλογος",owner:"Κάτοχος",user:"Χρήστης",distributor:"Διανομέας",originator:"Δημιουργός",pointOfContact:"Αρμόδιος επικοινωνίας",principalInvestigator:"Κύριος ερευνητής",processor:"Επεξεργαστής",publisher:"Εκδότης",author:"Συντάκτης"},CI_Telephone:{voice:"Φωνή",facsimile:"Φαξ"},DCPList:{caption:"DCP",XML:"XML",CORBA:"CORBA",JAVA:"JAVA",COM:"COM",SQL:"SQL",WebServices:"Web υπηρεσίες"},DQ_ConformanceResult:{caption:"Αποτέλεσμα συμμόρφωσης",explanation:"Εξήγηση",degree:{caption:"Βαθμός",validationPerformed:"Εκτελέστηκε επικύρωση",conformant:"Συμμορφούμενο",nonConformant:"Μη συμμορφούμενο"}},DQ_DataQuality:{report:"Αναφορά"},DQ_Scope:{level:"Πεδίο (οι πληροφορίες για την ποιότητα αφορούν)",levelDescription:"Περιγραφή επιπέδου"},EX_Extent:{caption:"Έκταση",description:"Περιγραφή",geographicElement:"Χωρική έκταση",temporalElement:"Χρονολογική έκταση",verticalElement:"Κατακόρυφη έκταση"},EX_GeographicBoundingBox:{westBoundLongitude:"Γεωγρ. μήκος δυτικού ορίου",eastBoundLongitude:"Γεωγρ. μήκος ανατολικού ορίου",southBoundLatitude:"Γεωγρ. μήκος νότιου ορίου",northBoundLatitude:"Γεωγρ. μήκος βόρειου ορίου"},EX_GeographicDescription:{caption:"Γεωγραφική περιγραφή"},EX_TemporalExtent:{TimePeriod:{beginPosition:"Ημ/νία έναρξης",endPosition:"Ημ/νία λήξης"}},EX_VerticalExtent:{minimumValue:"Ελάχιστη τιμή",maximumValue:"Μέγιστη τιμή",verticalCRS:"Κατακόρυφο CRS"},Length:{caption:"Μήκος",uom:"Μονάδες μέτρησης",km:"Χιλιόμετρα",m:"Μέτρα",mi:"Μίλια",ft:"Πόδια"},LI_Lineage:{statement:"Δήλωση προέλευσης"},MD_BrowseGraphic:{fileName:"Αναζήτηση URL γραφικού",fileDescription:"Αναζήτηση λεζάντας γραφικού",fileType:"Αναζήτηση τύπου γραφικού"},MD_ClassificationCode:{unclassified:"Μη εξουσιοδοτημένο",restricted:"Περιορισμένο",confidential:"Εμπιστευτικό",secret:"Απόρρητο",topSecret:"Άκρως απόρρητο"},MD_Constraints:{caption:"Περιορισμοί χρήσης",useLimitation:"Περιορισμός χρήσης"},MD_DataIdentification:{spatialRepresentationType:"Τύπος χωρικής αναπαράστασης",spatialResolution:"Χωρική ανάλυση",language:"Γλώσσα πόρου",supplementalInformation:"Συμπληρωματική"},MD_DigitalTransferOptions:{onLine:"Σε σύνδεση"},MD_Distribution:{distributionFormat:"Μορφότυπος διανομής",transferOptions:"Επιλογές μεταφοράς"},MD_Format:{name:"Όνομα μορφότυπου",version:"Έκδοση μορφότυπου"},MD_Identifier:{caption:"URI",identifierCaption:"Αναγνωριστικό",code:"Κωδικός"},MD_Keywords:{delimitedCaption:"Λέξεις-κλειδιά",thesaurusName:"Συσχετιζόμενος θησαυρός"},MD_KeywordTypeCode:{caption:"Τύπος λέξης-κλειδιού",discipline:"Κλάδος",place:"Τόπος",stratum:"Στρώμα",temporal:"Χρονολογικός",theme:"Θέμα"},MD_LegalConstraints:{caption:"Νομικοί περιορισμοί",accessConstraints:"Περιορισμοί πρόσβασης",useConstraints:"Περιορισμοί χρήσης",otherConstraints:"Άλλοι περιορισμοί"},MD_MaintenanceFrequencyCode:{caption:"Συχνότητα",continual:"Συνεχώς",daily:"Καθημερινά",weekly:"Εβδομαδιαία",fortnightly:"Ανά δύο βδομάδες",monthly:"Μηνιαία",quarterly:"Ανά τρίμηνο",biannually:"Ανά εξάμηνο",annually:"Ετησίως",asNeeded:"Όταν χρειάζεται",irregular:"Μη τακτικά",notPlanned:"Μη προγραμματισμένα",unknown:"Άγνωστο"},MD_Metadata:{caption:"Μεταδεδομένα",fileIdentifier:"Αναγνωριστικό αρχείου",language:"Γλώσσα μεταδεδομένων",hierarchyLevel:"Επίπεδο ιεραρχίας",hierarchyLevelName:"Όνομα επιπέδου ιεραρχίας",contact:"Αρμόδιος επικοινωνίας μεταδεδομένων",dateStamp:"Ημ/νία μεταδεδομένων",metadataStandardName:"Τυπικό όνομα μεταδεδομένων",metadataStandardVersion:"Τυπική έκδοση μεταδεδομένων",referenceSystemInfo:"Σύστημα αναφοράς",identificationInfo:"Αναγνώριση",distributionInfo:"Διανομή",dataQualityInfo:"Ποιότητα"},MD_ProgressCode:{caption:"Κωδικός προόδου",completed:"Ολοκληρώθηκε",historicalArchive:"Ιστορικό αρχείο",obsolete:"Παρωχημένο",onGoing:"Σε εξέλιξη",planned:"Προγραμματίστηκε",required:"Απαιτείται",underDevelopment:"Σε στάδιο ανάπτυξης"},MD_RepresentativeFraction:{denominator:"Παρονομαστής"},MD_Resolution:{equivalentScale:"Ισοδύναμη κλίμακα",distance:"Απόσταση"},MD_RestrictionCode:{copyright:"Πνευματικά δικαιώματα",patent:"Ευρεσιτεχνία",patentPending:"Ευρεσιτεχνία εκκρεμής",trademark:"Εμπορικό σήμα",license:"Άδεια",intellectualPropertyRights:"Δικαιώματα πνευματικής ιδιοκτησίας",restricted:"Περιορισμένη",otherRestrictions:"Άλλοι περιορισμοί"},MD_ScopeCode:{attribute:"Γνώρισμα",attributeType:"Τύπος γνωρίσματος",collectionHardware:"Υλικός εξοπλισμός συλλογής",collectionSession:"Συνεδρία συλλογής",dataset:"Σύνολο δεδομένων",series:"Σειρά δεδομένων",nonGeographicDataset:"Μη γεωγραφικό σύνολο δεδομένων",dimensionGroup:"Ομάδα διάστασης",feature:"Στοιχείο",featureType:"Τύπος στοιχείου",propertyType:"Τύπος ιδιότητας",fieldSession:"Συνεδρία πεδίου",software:"Λογισμικό",service:"Υπηρεσία",model:"Μοντέλο",tile:"Tile"},MD_ScopeDescription:{attributes:"Γνωρίσματα",features:"Στοιχεία",featureInstances:"Εμφανίσεις στοιχείου",attributeInstances:"Εμφανίσεις γνωρίσματος",dataset:"Σύνολο δεδομένων",other:"Άλλο"},MD_SecurityConstraints:{caption:"Περιορισμοί ασφάλειας",classification:"Κατηγοριοποίηση",userNote:"Σημείωση χρήστη",classificationSystem:"Σύστημα ταξινόμησης",handlingDescription:"Περιγραφή χειρισμού"},MD_SpatialRepresentationTypeCode:{caption:"Τύπος χωρικής αναπαράστασης",vector:"Διανυσματική",grid:"Πλεγματική",textTable:"Πίνακας κειμένου",tin:"TIN",stereoModel:"Στερεοσκοπικό μοντέλο",video:"Βίντεο"},MD_TopicCategoryCode:{caption:"Κατηγορία θέματος",boundaries:"Διοικητικά και πολιτικά όρια",farming:"Γεωργία και καλλιέργειες",climatologyMeteorologyAtmosphere:"Ατμόσφαιρα και κλίμα",biota:"Βιολογία και οικολογία",economy:"Επιχειρήσεις και οικονομικά",planningCadastre:"Κτηματολόγιο",society:"Πολιτισμός, κοινωνία και δημογραφία",elevation:"Ανύψωση και παράγωγα προϊόντα",environment:"Περιβάλλον και διατήρηση",structure:"Εγκαταστάσεις και δομές",geoscientificInformation:"Γεωλογία και γεωφυσική",health:"Ανθρώπινη υγεία και ασθένειες",imageryBaseMapsEarthCover:"Εικόνες και χάρτες υποβάθρου",inlandWaters:"Εσωτερικοί υδάτινοι πόροι",location:"Τοποθεσίες και γεωδαιτικά δίκτυα",intelligenceMilitary:"Στρατός",oceans:"Ωκεανοί και εκβολές",transportation:"Δίκτυα μεταφορών",utilitiesCommunication:"Δημόσιες επιχειρήσεις κοινής ωφέλειας και επικοινωνία"},MI_ContextCode:{caption:"Πλαίσιο",acquisition:"Απόκτηση",pass:"Μεταβίβαση",wayPoint:"Σημείο διαδρομής"},MI_EnvironmentalRecord:{caption:"Περιβαλλοντικές συνθήκες",averageAirTemperature:"Μέση θερμοκρασία αέρα",maxRelativeHumidity:"Μέγιστη σχετική υγρασία",maxAltitude:"Μέγιστο υψόμετρο",meterologicalConditions:"Μετεωρολογικές συνθήκες"},MI_Event:{identifier:"Αναγνωριστικό συμβάντος",time:"Χρόνος",expectedObjectiveReference:"Αναμενόμενος στόχος (Αναγνωριστικό στόχου)",relatedSensorReference:"Συσχετιζόμενος αισθητήρας (Αναγνωριστικό οργάνου)",relatedPassReference:"Συσχετιζόμενη μεταβίβαση (Αναγνωριστικό μεταβίβασης πλατφόρμας)"},MI_GeometryTypeCode:{point:"Σημειακή",linear:"Γραμμική",areal:"Εμβαδού",strip:"Λωρίδα"},MI_Instrument:{citation:"Παραπομπή οργάνου",identifier:"Αναγνωριστικό οργάνου",sType:"Τύπος οργάνου",description:"Περιγραφή οργάνου",mountedOn:"Ανεβασμένο σε",mountedOnPlatformReference:"Ανεβασμένο σε (Αναγνωριστικό πλατφόρμας)"},MI_Metadata:{acquisitionInformation:"Απόκτηση"},MI_Objective:{caption:"Στόχος",identifier:"Αναγνωριστικό στόχου",priority:"Προτεραιότητα στόχου",sFunction:"Τομέας στόχου",extent:"Έκταση",pass:"Μεταβίβαση πλατφόρμας",sensingInstrumentReference:"Όργανο ανίχνευσης (Αναγνωριστικό οργάνου)",objectiveOccurrence:"Συμβάντα",sections:{identification:"Αναγνώριση",extent:"Έκταση",pass:"Μεταβίβαση",sensingInstrument:"Όργανο ανίχνευσης",objectiveOccurrence:"Συμβάντα"}},MI_ObjectiveTypeCode:{caption:"Τύπος (Τεχνική συλλογής για στόχο)",instantaneousCollection:"Στιγμιαία συλλογή",persistentView:"Συνεχής προβολή",survey:"Τοπογραφία"},MI_Operation:{caption:"Λειτουργία",description:"Περιγραφή λειτουργίας",citation:"Παραπομπή λειτουργίας",identifier:"Αναγνωριστικό λειτουργίας",status:"Κατάσταση λειτουργίας",objectiveReference:"Συσχετιζόμενος στόχος (Αναγνωριστικό στόχου)",planReference:"Συσχετιζόμενο πλάνο (Αναγνωριστικό πλάνου)",significantEventReference:"Συσχετιζόμενο συμβάν (Αναγνωριστικό συμβάντος)",platformReference:"Συσχετιζόμενη πλατφόρμα (Αναγνωριστικό πλατφόρμας)",sections:{identification:"Αναγνώριση",related:"Συσχετιζόμενη"}},MI_OperationTypeCode:{caption:"Τύπος λειτουργίας",real:"Πραγματική",simulated:"Προσομοιούμενη",synthesized:"Συνθετική"},MI_Plan:{sType:"Γεωμετρική δειγματοληψία για τη συλλογή δεδομένων",status:"Κατάσταση πλάνου",citation:"Παραπομπή στην αρχή που ζητά τη συλλογή",satisfiedRequirementReference:"Εκπληρωμένη απαίτηση (Αναγνωριστικό απαίτησης)",operationReference:"Συσχετιζόμενη λειτουργία (Αναγνωριστικό λειτουργίας)"},MI_Platform:{citation:"Παραπομπή πλατφόρμας",identifier:"Αναγνωριστικό πλατφόρμας",description:"Περιγραφή της πλατφόρμας που υποστηρίζει το όργανο",sponsor:"Ανάδοχος οργανισμός για την πλατφόρμα",instrument:"Όργανο(α) ανεβασμένα στην πλατφόρμα",instrumentReference:"Αναγνωριστικό οργάνου",sections:{identification:"Αναγνώριση",sponsor:"Ανάδοχος",instruments:"Όργανα"}},MI_PlatformPass:{identifier:"Αναγνωριστικό μεταβίβασης πλατφόρμας",extent:"Έκταση μεταβίβασης πλατφόρμας",relatedEventReference:"Συσχετιζόμενο συμβάν (Αναγνωριστικό συμβάντος)"},MI_PriorityCode:{critical:"Κρίσιμο",highImportance:"Υψηλής σημασίας",mediumImportance:"Μέτριας σημασίας",lowImportance:"Χαμηλής σημασίας"},MI_RequestedDate:{requestedDateOfCollection:"Αιτούμενη ημερομηνία συλλογής",latestAcceptableDate:"Τελευταία αποδεκτή ημερομηνία"},MI_Requirement:{caption:"Απαίτηση",citation:"Παραπομπή για το υλικό οδηγιών απαίτησης",identifier:"Αναγνωριστικό απαίτησης",requestor:"Αιτών την απαίτηση",recipient:"Αποδέκτης των αποτελεσμάτων της απαίτησης",priority:"Προτεραιότητα απαίτησης",requestedDate:"Αιτούμενη ημερομηνία",expiryDate:"Ημερομηνία λήξης",satisifiedPlanReference:"Εκπληρωμένο πλάνο (Αναγνωριστικό πλάνου)",sections:{identification:"Αναγνώριση",requestor:"Αιτών",recipient:"Αποδέκτης",priorityAndDates:"Προτεραιότητα και ημερομηνίες",satisifiedPlan:"Εκπληρωμένο πλάνο"}},MI_SequenceCode:{caption:"Ακολουθία",start:"Έναρξη",end:"Τέλος",instantaneous:"Στιγμιαία"},MI_TriggerCode:{caption:"Ενεργοποίηση",automatic:"Αυτόματα",manual:"Χειροκίνητα",preProgrammed:"Προγραμματισμένα"},ObjectReference:{uuidref:"Αναφορά UUID",xlinkref:"Αναφορά URL"},RS_Identifier:{caption:"Χώρος κωδικού ID Plus",code:"Κωδικός",codeSpace:"Χώρος κωδικού"},SV_CouplingType:{loose:"Χαλαρός",mixed:"Μικτός",tight:"Περιορισμένος"},SV_OperationMetadata:{operationName:"Όνομα λειτουργίας",DCP:"DCP",connectPoint:"Σημείο σύνδεσης"},SV_ServiceIdentification:{serviceType:"Τύπος υπηρεσίας",couplingType:"Τύπος σύζευξης",containsOperations:"Μεταδεδομένα λειτουργίας",operatesOn:"Λειτουργεί σε"},TM_Primitive:{indeterminatePosition:"Απροσδιόριστη θέση",indeterminates:{before:"Πριν",after:"Μετά",now:"Τώρα",unknown:"Άγνωστο"}},gemet:{concept:{gemetConceptKeyword:"Λέξη-κλειδί έννοιας GEMET",tool:"Αναζήτηση...",dialogTitle:"GEMET - Λέξη-κλειδί έννοιας",searchLabel:"Αναζήτηση:",searchTip:"Αναζήτηση GEMET"},theme:{tool:"Αναζήτηση...",dialogTitle:"GEMET - Θέμα δεδομένων Inspire"},ioerror:"Παρουσιάστηκε σφάλμα στην επικοινωνία με την υπηρεσία GEMET: {url}",searching:"Αναζήτηση GEMET...",noMatch:"Δεν βρέθηκαν αποτελέσματα που να ταιριάζουν.",languages:{bg:"Βουλγαρικά",cs:"Τσεχικά",da:"Δανέζικα",nl:"Ολλανδικά",en:"Αγγλικά",et:"Εσθονικά",fi:"Φινλανδικά",fr:"Γαλλικά",de:"Γερμανικά",el:"Ελληνικά",hu:"Ουγγρικά",ga:"Κελτικά (Ιρλανδικά)",it:"Ιταλικά",lv:"Λετονικά",lt:"Λιθουανικά",mt:"Μαλτεζικά",pl:"Πολωνικά",pt:"Πορτογαλικά",ro:"Ρουμανικά",sk:"Σλοβακικά",sl:"Σλοβενικά",es:"Ισπανικά",sv:"Σουηδικά"}}});