"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlayCircle, PauseCircle, RotateCcw, Edit, Trash2, Plus } from "lucide-react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useUserStore } from "@/store/store"
import { Badge } from "@/components/ui/badge"
import { use } from 'react'
export default function SingleDeckView(props) {
  const params = use(props.params)
  const deckId = params.deckId;
  // const [deckId, setDeckId] = useState("");
  const {UserId} = useUserStore();
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showBack, setShowBack] = useState(false)
  const [newCard, setNewCard] = useState({ front: "", back: "" })
  const [cards, setCards] = useState([])
  const [reviewCards, setReviewCards] = useState([])
  const [deckInfo, setDeckInfo] = useState({})

  const startPlaying = () => {
    setIsPlaying(true)
    setShowBack(false)
  }

  const getDeckCards = async() => {
    const res = await axios.post("/api/cards/get-deck-cards", {deckId});
    const data = res.data;
    console.log(data);
    setCards(data.cards);
    
  }
  const getReviewCards = async() => {
    const res = await axios.post("/api/cards/get-due-cards", {deckId, userId: UserId});
    const data = res.data;
    console.log(data);
    setReviewCards(data.cards);
    
  }


  const stopPlaying = () => {
    setIsPlaying(false)
    setCurrentCardIndex(0)
    setShowBack(false)
  }

  const nextCard = () => {
    if (currentCardIndex < reviewCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setShowBack(false)
    } else {
      toast.success("You have completed the study session");
      stopPlaying()
    }
  }

  const flipCard = () => {
    setShowBack(!showBack)
  }

  const handleNewCardChange = (e) => {
    const { name, value } = e.target
    setNewCard(prev => ({ ...prev, [name]: value }))
  }

  const addNewCard = async() => {
    if (newCard.front && newCard.back) {

      const newCardWithId = { ...newCard, id: `${cards.length + 1}`, deckId: deckId, userId: UserId }
      console.log(newCardWithId)
      const res = await axios.post("/api/cards/add-card",newCardWithId);
      const data = res.data;
      if(data.type === "success") {
        setCards([...cards, newCardWithId])
        setNewCard({ front: "", back: "" })
        toast.success(data.message);
      }
      else {
        toast.error(data.message);
      }

    }
  }

  const deleteCard = async(id) => {
    const res = await axios.post("/api/cards/delete-card", {cardId: id});
    if (res.data.type === "success") {
      setCards(cards.filter(card => card._id !== id));
      toast.success(res.data.message);
    }
    else {
      toast.error(res.data.message);
    }
  }

  const getDeckInfo = async() => {
    const res = await axios.post("/api/decks/get-single-deck", {deckId});
    console.log(res.data)
    if (res.data.type === "success") {
      setDeckInfo(res.data.deck);
    }
    else {
      toast.error(res.data.message);
    }
  }

  const updateCardInfo = async(difficulty) => {
    const re = await axios.post("/api/cards/update-card-details", {cardId: reviewCards[currentCardIndex]._id, difficulty});
    const data = re.data;

    if (data.type == "success") {
      // toast.success(data.message);
      nextCard();
    }
    else {
      toast.error(data.message);
    }
  }

  const importDeck = async() => {
    console.log(deckId, UserId);
   
    const re = await axios.post("/api/decks/import-deck", {deckId, userId: UserId});
    const data = re.data;

    if (data.type === "success") {
      toast.success(data.message);
    }
    else {
      toast.error(data.message);
    }
  }

  useEffect(() => {
    getDeckInfo();
    getDeckCards();
    getReviewCards();
  }, [])




  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{deckInfo.title}</h1>
        <div className="space-x-2">
         {
          deckInfo.userId != UserId?(
            <Button onClick={importDeck} variant="outline">
            Import
          </Button>
          ):null
         }
         
        </div>
      </div>

      <p className="text-gray-600 mb-4">{deckInfo.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {deckInfo?.tags?.map((tag, index) => (
          <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Study Session</h2>
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="p-6">
            {isPlaying ? (
              <div className="text-center">
                <h3 className="text-lg font-medium mb-4">
                  Card {currentCardIndex + 1} of {reviewCards.length}
                </h3>
                <p className="text-2xl mb-4">
                  {showBack
                    ? reviewCards[currentCardIndex].back
                    : reviewCards[currentCardIndex].front}
                </p>
                <Button onClick={flipCard} className="mb-4">
                  Flip Card
                </Button>
                <div className="flex justify-center space-x-4">
                  {/* <Button onClick={stopPlaying}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={nextCard}>
                    Next Card
                  </Button> */}
                   <Button onClick={()=> {
                    updateCardInfo("easy");
                   }}>
                    Easy
                  </Button>
                   <Button onClick={()=>{
                    updateCardInfo("medium");
                   }}>
                    Medium
                  </Button>
                   <Button onClick={()=> {
                    updateCardInfo("hard");
                   }}>
                    Hard
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="mb-4">Ready to start studying?</p>
               {
                deckInfo.userId == UserId?(
                  <Button onClick={startPlaying}>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Session
                </Button>
                ):(
                  <p>Import this deck by clicking on "Import" button to study this deck</p>
                )
               }
               
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Progress</h2>
        <Progress value={(currentCardIndex / reviewCards.length) * 100} className="w-full" />
        <p className="text-sm text-gray-600 mt-2">
          {currentCardIndex} of {reviewCards.length} cards studied
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">All Cards</h2>
          <Dialog>
            <DialogTrigger asChild>
            {
          deckInfo.userId == UserId?(
            <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Card
              </Button>
          ):null
         }
             
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Card</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="front">Front</label>
                  <Input
                    id="front"
                    name="front"
                    value={newCard.front}
                    onChange={handleNewCardChange}
                    placeholder="Enter the question or prompt"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="back">Back</label>
                  <Textarea
                    id="back"
                    name="back"
                    value={newCard.back}
                    onChange={handleNewCardChange}
                    placeholder="Enter the answer or explanation"
                  />
                </div>
              </div>
              <Button onClick={addNewCard}>Add Card</Button>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <Card key={card._id} className="hover:shadow-lg transition-shadow">
             
       
              <CardContent className="p-4">
             <div className="my-3 flex items-center">
                <p className="font-medium ">Card {index + 1}</p>
                {new Date(card.nextReviewDate) <= new Date() && (
              <Badge className={"ml-3"} >
        Review

        </Badge>
      )}
             </div>
                <p className="text-sm text-gray-600 mb-2">Front: {card.front}</p>
                <p className="text-sm text-gray-600">Back: {card.back}</p>
              </CardContent>
              <CardFooter>
              {
          deckInfo.userId == UserId?(
            <Button variant="destructive" onClick={()=>{
              deleteCard(card._id);
            }}>Delete Card</Button>
          ):null
         }
                
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}