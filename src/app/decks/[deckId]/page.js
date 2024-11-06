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

// Mock data for the deck and its cards
const deckData = {
  id: "1",
  title: "JavaScript Basics",
  description: "Learn the fundamentals of JavaScript programming",
  cardCount: 10,
  subject: "Programming",
  tags: ["javascript", "web development", "coding"],
  cards: [
    { id: "1", front: "What is a variable?", back: "A container for storing data values" },
    { id: "2", front: "What is a function?", back: "A reusable block of code that performs a specific task" },
    { id: "3", front: "What is an array?", back: "A special variable that can hold more than one value" },
    { id: "4", front: "What is a loop?", back: "A way to repeat a block of code multiple times" },
    { id: "5", front: "What is an object?", back: "A container for properties and methods" },
    { id: "6", front: "What is a conditional statement?", back: "A way to perform different actions based on different conditions" },
    { id: "7", front: "What is the DOM?", back: "Document Object Model - a programming interface for HTML and XML documents" },
    { id: "8", front: "What is an event listener?", back: "A function that waits for an event to occur" },
    { id: "9", front: "What is a callback function?", back: "A function passed as an argument to another function" },
    { id: "10", front: "What is scope in JavaScript?", back: "The context in which values and expressions are 'visible' or can be referenced" },
  ]
}

export default function SingleDeckView({params}) {
  const {deckId} = params;
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showBack, setShowBack] = useState(false)
  const [newCard, setNewCard] = useState({ front: "", back: "" })
  const [cards, setCards] = useState([])
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


  const stopPlaying = () => {
    setIsPlaying(false)
    setCurrentCardIndex(0)
    setShowBack(false)
  }

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setShowBack(false)
    } else {
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

      const newCardWithId = { ...newCard, id: `${cards.length + 1}`, deckId: deckId }
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

  useEffect(() => {
    getDeckInfo();
    getDeckCards();
  }, [])
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{deckInfo.title}</h1>
        <div className="space-x-2">
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{deckInfo.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {deckInfo.tags.map((tag, index) => (
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
                  Card {currentCardIndex + 1} of {cards.length}
                </h3>
                <p className="text-2xl mb-4">
                  {showBack
                    ? cards[currentCardIndex].back
                    : cards[currentCardIndex].front}
                </p>
                <Button onClick={flipCard} className="mb-4">
                  Flip Card
                </Button>
                <div className="flex justify-center space-x-4">
                  <Button onClick={stopPlaying}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={nextCard}>
                    Next Card
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="mb-4">Ready to start studying?</p>
                <Button onClick={startPlaying}>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Progress</h2>
        <Progress value={(currentCardIndex / cards.length) * 100} className="w-full" />
        <p className="text-sm text-gray-600 mt-2">
          {currentCardIndex} of {cards.length} cards studied
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">All Cards</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Card
              </Button>
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
                <p className="font-medium mb-2">Card {index + 1}</p>
                <p className="text-sm text-gray-600 mb-2">Front: {card.front}</p>
                <p className="text-sm text-gray-600">Back: {card.back}</p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" onClick={()=>{
                  deleteCard(card._id);
                }}>Delete Card</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}