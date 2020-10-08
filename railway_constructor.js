function rbbuild () {
    loops.pause(300)
    builder.shift(-3, 0, 0)
    Pos1 = builder.position()
    builder.teleportToOrigin()
    builder.shift(5, 0, 0)
    Pos2 = builder.position()
    blocks.fill(
    blocks.blockById(block_id),
    Pos1,
    Pos2,
    FillOperation.Replace
    )
    builder.teleportToOrigin()
    builder.shift(-3, 0, 1)
    Pos1 = builder.position()
    builder.teleportToOrigin()
    builder.shift(5, 0, -1)
    Pos2 = builder.position()
    blocks.fill(
    blocks.blockById(block_id),
    Pos1,
    Pos2,
    FillOperation.Replace
    )
    loops.pause(300)
    builder.teleportToOrigin()
    builder.shift(0, 1, 0)
    builder.setOrigin()
    builder.shift(-3, 0, 0)
    Pos1 = builder.position()
    builder.teleportToOrigin()
    builder.shift(4, 0, 0)
    Pos2 = builder.position()
    blocks.fill(
    POWERED_RAIL,
    Pos1,
    Pos2,
    FillOperation.Replace
    )
    builder.shift(0, 0, -1)
    builder.place(REDSTONE_TORCH)
    builder.shift(0, 0, 1)
    builder.place(POWERED_RAIL)
    loops.pause(300)
    builder.teleportToOrigin()
    builder.shift(-2, 0, 0)
    agent.teleport(builder.position(), WEST)
    builder.teleportToOrigin()
    builder.shift(6, -1, 0)
    builder.setOrigin()
}
player.onChat(".rb.end", function () {
    builder_onready = 1
    player.say("§3Railway builder ahve been turned down")
    player.say("§2To continue a railway, setup another railway builder again!")
})
player.onChat(".rb.build", function () {
    while (builder_onready == 0) {
        for (let index = 0; index < 9; index++) {
            builder.shift(0, 0, 1)
            Pos1 = builder.position()
            builder.teleportToOrigin()
            builder.shift(2, 4, -1)
            Pos2 = builder.position()
            blocks.fill(
            AIR,
            Pos1,
            Pos2,
            FillOperation.Replace
            )
            builder.teleportToOrigin()
            builder.place(blocks.blockById(block_id))
            builder.shift(0, 0, 1)
            builder.place(blocks.blockById(block_id))
            builder.teleportToOrigin()
            builder.shift(0, 0, -1)
            builder.place(blocks.blockById(block_id))
            builder.teleportToOrigin()
            builder.shift(0, 1, 0)
            builder.place(POWERED_RAIL)
            builder.shift(1, -1, 0)
            builder.setOrigin()
        }
        builder.shift(-1, 1, -1)
        builder.place(REDSTONE_TORCH)
        builder.teleportToOrigin()
        builder.place(blocks.blockById(block_id))
        builder.shift(0, 0, 1)
        builder.place(blocks.blockById(block_id))
        builder.teleportToOrigin()
        builder.shift(0, 0, -1)
        builder.place(blocks.blockById(block_id))
        builder.teleportToOrigin()
        builder.shift(0, 1, 0)
        builder.place(POWERED_RAIL)
        builder.shift(1, -1, 0)
        builder.setOrigin()
    }
})
player.onChat(".rb.rw", function (torch_placing2) {
    agent.dropAll(RIGHT)
    agent_collect_block = 0
    agent.teleportToPlayer()
    agent.move(FORWARD, 1)
    player.say("§3Please drop the block that you want the railway build with to your agent. When you drop, type \"§2.rb.block§3\"")
})
player.onChat(".rb.debug", function (rb_debug2) {
    if (rb_debug2 == 0) {
        player.say(agent.getOrientation())
    } else if (rb_debug2 == 1) {
        player.say(agent.getItemDetail(1))
    } else {
    	
    }
})
player.onChat(".rb.a1", function (Response_anwser1) {
    if (Request_response1 == 0) {
        if (Response_anwser1 == 0) {
            Request_response1 = 1
            agent.teleportToPlayer()
            agent.move(FORWARD, 1)
            Request_response2 = 0
            player.say("§3Please type \"§2.rb.a2 1§3\" when your agent is looking at the same direction as you, this will be where your railway go too. Type \"§2.rb.a2 0§3\" to turn your agent!")
        } else {
            player.say("§3Railway builder setup cancelled")
        }
    }
})
player.onChat(".rb.block", function () {
    if (agent_collect_block == 0) {
        agent.collectAll()
        block_id = agent.getItemDetail(1)
        player.say("§3You chose the block that ID is §2\"" + block_id + "§3\" for the metal of your railway")
        if (block_id == 12 || block_id == 13 || block_id == 252) {
            player.say("§4Warning! Using zero gravity blocks are dangerous, if you wnat to cancel please enter \"§2.rb.a2 1§4\" in the next section.")
        }
        player.say("§3Are you sure to launch the builder? If you do, the blocks near you will be replace! §2<.rb.a1 0/.rb.a1 1>(0=true, 1=false)")
        Request_response1 = 0
        agent_collect_block = 1
    }
})
player.onChat(".rb.help", function () {
    player.say("§2=====§6§lGuide Of §r§1§oRBP" + Software_version + "§r§3 (Page 1/1)§2=====")
    player.say("§6.rb.help §2- Open the guilde of rbp" + Software_version)
    player.say("§6.rb.rw [redstone torch placing:<\"0\"/1\">(0=true,1=false. 0 is default)] §2- Everytime to setup a railway builder")
    player.say("§6.rb.build [redstone torch placing:<\"0\"/1\">(0=true,1=false. 0 is default)] §2- Turn on all railway builder(s) after setup")
    player.say("§6.rb.end §2- Stop all railway builder(s) that after turn on (you must setup another builder if you want to continue the railway)")
})
// The direction part take me long time......
player.onChat(".rb.a2", function (Response_anwser2) {
    if (Request_response2 == 0) {
        if (Response_anwser2 == 0) {
            agent.turn(LEFT_TURN)
        } else {
            Request_response2 = 1
            player.say("§3Initialing......")
            builder.teleportTo(player.position())
            builder.shift(0, -1, 0)
            builder.place(blocks.blockById(block_id))
            railway_direction = agent.getOrientation()
            loops.pause(300)
            builder.setOrigin()
            if (railway_direction == 0) {
                builder.face(SOUTH)
            } else if (railway_direction == 90) {
                builder.face(WEST)
            } else if (railway_direction == -90) {
                builder.face(EAST)
            } else {
                builder.face(NORTH)
            }
            rbbuild()
            player.say("§3Preparing builder......")
            loops.pause(3)
            player.execute(
            "summon minecart " + agent.getPosition()
            )
            agent.teleportToPlayer()
            agent.turn(LEFT_TURN)
            agent.move(FORWARD, 2)
            builder_onready = 0
            player.say("§3Setup §2§lsuccessfully§r§3! Follow the step below to start building :")
            player.say("§61. Sit on the minecart spawned")
            player.say("§62. Type \"§2.rb.build§6\" to turn on the builder")
            player.say("§62. Press the forward button to make the minecart go to the same direction as the railway")
        }
    }
})
let railway_direction = 0
let Pos2: Position = null
let Pos1: Position = null
let builder_onready = 0
let agent_collect_block = 0
let Request_response2 = 0
let Request_response1 = 0
let block_id = 0
let Software_version = 0
let rb_debug = 0
let torch_placing = 0
Software_version = 1
player.say("§3Welcome to use §3§lRailway §6Builder §4Pro " + Software_version + "§r§3," + player.name() + " !")
player.say("§3This software was made by §6Endermanbug§3 !")
player.say("§3Please subscribe to my §4Youtube Channel :§o§6Endermanbug終界翡翠§3, §2https://www.youtube.com/channel/UCD4OW4HGfWcDpfTvqypyYUw")
player.say("§3To know how to use the railway builder, type \"§2.rb.help§3\".")
block_id = 152
Request_response1 = 1
Request_response2 = 0
agent_collect_block = 1
builder_onready = 1
