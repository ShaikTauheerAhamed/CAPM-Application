module.exports = cds.service.impl( async function(){
 
    //Step 1: get the object of our odata entities
    const { EmployeeSet, POs } = this.entities;

    this.before('UPDATE', EmployeeSet, (req) => {
        var salary = parseInt(req.data.salaryAmount);
        if(salary >= 1000000){
            req.error(500,"Ola! sorry no one can get this salary in my org");
        }
    });

    // this.after('UPDATE',EmployeeSet,(req)=>{
    //     var salary = parseInt(req.data.salaryAmount);
    //     if(salary<15000){
    //         req.error(500,"Ola! sorry no one can get this salary in my org")
    //     }
    // })
 
    this.on('boost', async (req,res) => {
        try {
            //since its instance bound we will get the key of PO
            const ID = req.params[0];
            //params – a dictionary with the values being Type Definitions
            //returns – a Type Definition describing the response
            //Print on console the key
            console.log("Hey Amigo, Your purchase order with id " + req.params[0] + " will be boosted");
            //Start a db transaction suing cds ql - https://cap.cloud.sap/docs/node.js/cds-tx
            const tx = cds.tx(req);
            //UPDATE dbtab set grossamount = current + 20k WHERE ID = key
            await tx.update(POs).with({
                GROSS_AMOUNT: { '+=' : 20000 }
            }).where(ID);
        } catch (error) {
            return "Error " + error.toString();
        }
    });
 
    this.on('largestOrder', async (req,res) => {
        try {
            const tx = cds.tx(req);
         
            //SELECT * UPTO 1 ROW FROM dbtab ORDER BY GROSS_AMOUNT desc
            const reply = await tx.read(POs).orderBy({
                GROSS_AMOUNT: 'desc'
                //     GROSS_AMOUNT: 'asc'
            }).limit(2);
 
            return reply;
        } catch (error) {
            return "Error " + error.toString();
        }
    });



    this.on('CREATE', POs, async (req) => {
        const data = req.data;
        // Generate a UUID for the ID field
        //data.ID = uuidv4();
       
        // You can add other logic here, e.g., validation
 
        return await INSERT.into(POs).entries(data);
    });
 


    this.on('getOrderDefaults', async (req,res) => {
        return {
            "OVERALL_STATUS": "N"
        };
    });
}
);